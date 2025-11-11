import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../services/products.service';
import { CauldronService } from '../../services/cualdron.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {
  aliasMagico = 'Mago Anónimo';
  direccionMagica = 'Callejón Diagon Nº93';

  pedidos = [
    { fecha: '01/11/2025', producto: 'Galletas Canario', estado: 'Entregado' },
    { fecha: '07/11/2025', producto: 'Libro Mordedor', estado: 'En camino' }
  ];

  listaDeseos: Product[] = [
    {
      id: 1,
      name: 'Pluma Invisible',
      price: '25',
      unit: 'unidad',
      description: 'Una pluma mágica que escribe sin ser vista.',
      category: 'Artículos mágicos',
      image: 'assets/img/products/pluma-invisible.png'
    },
    {
      id: 2,
      name: 'Libro Mordedor',
      price: '60',
      unit: 'unidad',
      description: 'Un libro encantado que muerde a quien lo abre sin permiso.',
      category: 'Libros encantados',
      image: 'assets/img/products/libro-mordedor.png'
    }
  ];

  constructor(private cauldronService: CauldronService) {}

  editarInfo() {
    alert(`Alias: ${this.aliasMagico}\nDirección: ${this.direccionMagica}`);
  }

  salir() {
    alert('Has salido del perfil mágico.');
  }

  agregarAlCaldero(product: Product) {
    this.cauldronService.addItem(product);
    alert(`${product.name} ha sido agregado al caldero mágico 🧙‍♂️`);
  }

  eliminarDeseo(product: Product) {
    this.listaDeseos = this.listaDeseos.filter(d => d.id !== product.id);
    alert(`${product.name} ha sido eliminado de tu lista de deseos 💨`);
  }
}
