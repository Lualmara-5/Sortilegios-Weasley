import { Component, AfterViewInit } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common';  // 👈 agrega esto

declare const paypal: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],  // 👈 agrega aquí los imports
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout implements AfterViewInit {
  productName = 'Poción de Amor';
  total = 50000; // en COP
  paymentStatus = '';

  ngAfterViewInit() {
    paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'COP',
              value: this.total.toString()
            },
            description: this.productName
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        const details = await actions.order.capture();
        this.paymentStatus = `Pago completado por ${details.payer.name.given_name}!`;
      },
      onCancel: () => {
        this.paymentStatus = 'Pago cancelado por el usuario.';
      },
      onError: (err: any) => {
        console.error(err);
        this.paymentStatus = 'Ocurrió un error al procesar el pago.';
      }
    }).render('#paypal-button-container');
  }
}