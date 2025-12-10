import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, of, map, startWith, Subscription } from 'rxjs';
import { CauldronService, CartItem } from '../../services/cualdron.service';

type SnapshotItem = {
  id: number;
  name: string;
  price: string;
  unit: string;
  qty: number;
  image: string;
};

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit, AfterViewInit, OnDestroy {

  /** Items como observable para plantillas con | async */
  items$!: Observable<SnapshotItem[]>;

  /** Totales como streams (para usar en la vista) */
  totalCOP$!: Observable<number>;
  totalUSD$!: Observable<number>;

  /** Totales numéricos para la lógica de PayPal */
  private totalCOP = 0;
  private totalUSD = 0;

  /** Suscripción para mantener totales sincronizados */
  private sub: Subscription | null = null;

  /** Tasas DEMO (ajusta si tu equipo definió otras) */
  private USD_TO_COP = 5000;      // 1 USD ≈ 5000 COP
  private GALLEON_TO_USD = 7;     // 1 galeón ≈ 7 USD
  private SICKLE_TO_USD = 0.5;    // 1 sickle ≈ 0.5 USD

  // INYECTAR EL SERVICE (public para usarlo en la plantilla si quieres)
  constructor(public cauldronService: CauldronService) {}

  ngOnInit() {
    // Leemos snapshot para fallback si se recarga la página
    const snapshotItems = this.readSnapshot();

    // Preferimos la fuente reactiva del service; si está vacía usamos el snapshot con startWith
    this.items$ = this.cauldronService.items$.pipe(
    map((cartItems: CartItem[]) => cartItems.map(ci => ({
      id: Number(ci.product.id) || 0,
      name: String(ci.product.name || ''),
      price: String(ci.product.price || ''),
      unit: String(ci.product.unit || ''),
      qty: Number(ci.quantity || 0),
      image: String(ci.product.image || '')
    } as SnapshotItem))),
  // si el service aún no tiene items (p. ej. recarga), mostramos el snapshot
    startWith(snapshotItems)
);

    // Inicializar totales usando el service (fuente de verdad)
    this.recalculateTotals();

    // Mantener totales sincronizados cada vez que cambien los items en el service
    this.sub = this.cauldronService.items$.subscribe(() => {
      this.recalculateTotals();
    });
  }

  ngAfterViewInit() {
    // aseguramos que PayPal se renderice después de que ngOnInit haya calculado totalUSD
    setTimeout(() => this.initPayPalButton(), 0);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  /** Recalcula totalCOP / totalUSD y actualiza los Observables usados en plantilla */
  private recalculateTotals() {
    // usa la función del service (source of truth)
    this.totalCOP = this.cauldronService.getTotalCOP();

    // total USD (incluye / no incluye envío según quieras; aquí sin envío)
    this.totalUSD = Math.round((this.totalCOP / this.USD_TO_COP) * 100) / 100;

    // Exponer para plantillas que usan async pipe
    this.totalCOP$ = of(this.totalCOP);
    this.totalUSD$ = of(this.totalUSD);
  }

  /** Lee snapshot del carrito desde localStorage (fallback visual) */
  private readSnapshot(): SnapshotItem[] {
    try {
      const raw = localStorage.getItem('weasley-cart');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((x: any) => ({
        id: Number(x?.id) || 0,
        name: String(x?.name || ''),
        price: String(x?.price || ''),
        unit: String(x?.unit || ''),
        qty: Number(x?.qty) || 0,
        image: String(x?.image || ''),
      })) as SnapshotItem[];
    } catch {
      return [];
    }
  }

  /** Convierte string de precio a USD numérico */
  priceToUSD(price: string): number {
    const p = (price || '').toLowerCase().trim();
    if (p.includes('usd') || p.includes('$')) {
      const num = parseFloat(p.replace(/[^\d.]/g, ''));
      return isNaN(num) ? 0 : num;
    }
    if (p.includes('cop')) {
      const cop = parseFloat(p.replace(/[^\d.]/g, ''));
      return isNaN(cop) ? 0 : cop / this.USD_TO_COP;
    }
    if (p.includes('galeon')) {
      const g = parseFloat(p.replace(/[^\d.]/g, ''));
      return isNaN(g) ? 0 : g * this.GALLEON_TO_USD;
    }
    if (p.includes('sickle')) {
      const s = parseFloat(p.replace(/[^\d.]/g, ''));
      return isNaN(s) ? 0 : s * this.SICKLE_TO_USD;
    }
    const fallback = parseFloat(p.replace(/[^\d.]/g, ''));
    return isNaN(fallback) ? 0 : fallback / this.USD_TO_COP;
  }

  /** Convierte string de precio a COP numérico */
  priceToCOP(price: string): number {
    const p = (price || '').toLowerCase().trim();
    if (p.includes('cop')) {
      const cop = parseFloat(p.replace(/[^\d.]/g, ''));
      return isNaN(cop) ? 0 : cop;
    }
    if (p.includes('usd') || p.includes('$')) {
      const usd = parseFloat(p.replace(/[^\d.]/g, ''));
      return isNaN(usd) ? 0 : usd * this.USD_TO_COP;
    }
    if (p.includes('galeon')) {
      const g = parseFloat(p.replace(/[^\d.]/g, ''));
      return isNaN(g) ? 0 : g * this.GALLEON_TO_USD * this.USD_TO_COP;
    }
    if (p.includes('sickle')) {
      const s = parseFloat(p.replace(/[^\d.]/g, ''));
      return isNaN(s) ? 0 : s * this.SICKLE_TO_USD * this.USD_TO_COP;
    }
    const fallback = parseFloat(p.replace(/[^\d.]/g, ''));
    return isNaN(fallback) ? 0 : fallback;
  }

  /** Carga el botón de PayPal sandbox */
  private initPayPalButton() {
    const scriptId = 'paypal-sdk';
    if (document.getElementById(scriptId)) {
      this.renderPaypal();
      return;
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://www.paypal.com/sdk/js?client-id=sb&currency=USD';
    script.onload = () => this.renderPaypal();
    document.body.appendChild(script);
  }

  private renderPaypal() {
    // @ts-ignore
    if (!window.paypal) return;
    // @ts-ignore
    window.paypal.Buttons({
      createOrder: (_: any, actions: any) => actions.order.create({
        purchase_units: [{
          amount: { value: this.totalUSD.toString(), currency_code: 'USD' },
        }]
      }),
      onApprove: (_: any, actions: any) =>
        actions.order.capture().then((details: any) => {
          alert(`✨ Gracias, ${details.payer?.name?.given_name || 'mago'}! Tu pedido ha sido confirmado.`);
          localStorage.removeItem('weasley-cart');
          localStorage.removeItem('weasley-totalCOP');
          // opcional: limpiar service o redirigir
          this.cauldronService.clearCauldron();
        }),
    }).render('#paypal-button-container');
  }

  /** Scroll hacia el botón PayPal */
  scrollToPay() {
    document.getElementById('paypal-button-container')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
