import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// El SDK de PayPal lo cargas en index.html:
// <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD"></script>
declare const paypal: any;

type CheckoutItem = {
  id: number;
  name: string;
  price: string;  // "5 galeones", "11 sickles", "120000 COP", "38 USD"
  unit: string;
  qty: number;
  image: string;
};

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private router = inject(Router);

  // Snapshot del carrito
  items: CheckoutItem[] = [];

  // Totales (USD para PayPal)
  subtotalUSD = 0;
  shippingUSD = 12;          // demo fijo
  totalUSD = 0;

  // Si quieres mostrar el total en COP en la UI
  readonly USD_TO_COP = 4000;

  ngOnInit(): void {
    this.loadSnapshot();
    this.recomputeTotals();
  }

  /** Lee el carrito guardado por el caldero */
  private loadSnapshot() {
    try {
      const raw = localStorage.getItem('weasley-cart');
      this.items = raw ? (JSON.parse(raw) as CheckoutItem[]) : [];
    } catch {
      this.items = [];
    }
  }

  /** Convierte precio textual a USD (demo) */
  priceToUSD(price: string): number {
    const lower = (price || '').toLowerCase().trim();
    const num = parseFloat((lower.match(/[\d.]+/) || ['0'])[0]);

    if (Number.isNaN(num)) return 0;

    // USD explícito
    if (lower.includes('usd')) return num;

    // Moneda del mundo mágico (demos)
    // 1 galeón ≈ 5 USD, 1 sickle ≈ 1 USD
    if (lower.includes('galeon')) return num * 5;
    if (lower.includes('sickle')) return num * 1;

    // COP (asumimos 1 USD = 4000 COP)
    if (lower.includes('cop') || lower.startsWith('$')) {
      return +(num / this.USD_TO_COP).toFixed(2);
    }

    // fallback: tratar el número como USD
    return num;
  }

  /** Recalcula subtotal/total en USD */
  private recomputeTotals() {
    this.subtotalUSD = this.items.reduce((acc, it) => {
      const unitUSD = this.priceToUSD(it.price);
      return acc + unitUSD * (it.qty || 0);
    }, 0);
    this.totalUSD = +(this.subtotalUSD + (this.items.length ? this.shippingUSD : 0)).toFixed(2);
  }

  /** Total de la UI en COP (opcional) */
  get totalCOP(): number {
    return Math.round(this.totalUSD * this.USD_TO_COP);
  }

  /** Renderiza los botones de PayPal dentro de #paypal-container */
  renderPayPal() {
    const containerId = 'paypal-container';
    const host = document.getElementById(containerId);
    if (!host) {
      console.error(`No se encontró #${containerId} en el DOM.`);
      return;
    }

    // Limpia si el usuario vuelve a pulsar
    host.innerHTML = '';

    if (typeof paypal === 'undefined' || !paypal.Buttons) {
      alert('PayPal SDK no está disponible. Verifica el <script> en index.html.');
      return;
    }

    const itemsForPayPal = this.items.map((it) => ({
      name: it.name,
      quantity: String(it.qty || 1),
      unit_amount: {
        currency_code: 'USD',
        value: this.priceToUSD(it.price).toFixed(2),
      },
    }));

    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
      },

      createOrder: (_data: unknown, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.totalUSD.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.subtotalUSD.toFixed(2),
                  },
                  shipping: {
                    currency_code: 'USD',
                    value: (this.items.length ? this.shippingUSD : 0).toFixed(2),
                  },
                },
              },
              items: itemsForPayPal,
            },
          ],
        });
      },

      onApprove: async (_data: unknown, actions: any) => {
        try {
          const details = await actions.order.capture();
          const orderId: string | undefined = details?.id;

          // Limpia carrito (opcional)
          // localStorage.removeItem('weasley-cart');

          // Redirige a la pantalla de confirmación
          this.router.navigate(['/orden-confirmada'], {
            queryParams: { orderId },
            state: { order: details },
          });
        } catch (e) {
          console.error('Error al capturar la orden:', e);
          alert('No se pudo completar el pago.');
        }
      },

      onError: (err: unknown) => {
        console.error('PayPal error:', err);
        alert('Ocurrió un error con PayPal.');
      },
    }).render(`#${containerId}`);
  }
}