import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, of, map } from 'rxjs';

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
export class Checkout implements OnInit, AfterViewInit {

  /** Items como observable para plantillas con | async */
  items$!: Observable<SnapshotItem[]>;

  /** Totales como streams (para usar en la vista) */
  totalCOP$!: Observable<number>;
  totalUSD$!: Observable<number>;

  /** Totales numéricos para la lógica de PayPal */
  private totalCOP = 0;
  private totalUSD = 0;

  /** Tasas DEMO (ajusta si tu equipo definió otras) */
  private USD_TO_COP = 5000;      // 1 USD ≈ 5000 COP
  private GALLEON_TO_USD = 7;     // 1 galeón ≈ 7 USD
  private SICKLE_TO_USD = 0.5;    // 1 sickle ≈ 0.5 USD

  ngOnInit() {
    const items = this.readSnapshot();
    this.items$ = of(items);

    // Streams de totales
    this.totalCOP$ = this.items$.pipe(
      map(list => list.reduce((acc, it) => acc + this.priceToCOP(it.price) * (it.qty || 0), 0))
    );
    this.totalUSD$ = this.items$.pipe(
      map(list => list.reduce((acc, it) => acc + this.priceToUSD(it.price) * (it.qty || 0), 0))
    );

    // Mantener totales sincronizados
    this.totalCOP$.subscribe(v => this.totalCOP = v);
    this.totalUSD$.subscribe(v => this.totalUSD = parseFloat(v.toFixed(2)));
  }

  ngAfterViewInit() {
    this.initPayPalButton();
  }

  /** Lee snapshot del carrito desde localStorage */
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
          // localStorage.removeItem('weasley-cart');
        }),
    }).render('#paypal-button-container');
  }

  /** Scroll hacia el botón PayPal */
  scrollToPay() {
    document.getElementById('paypal-button-container')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}