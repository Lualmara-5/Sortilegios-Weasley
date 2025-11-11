import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CauldronService } from '../../services/cualdron.service';
import { WishlistService, Deseo } from '../../services/wishlist.service';
import { Product } from '../../services/products.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  aliasMagico = 'Mago Anónimo';
  direccionMagica = 'Callejón Diagon Nº93';

  pedidos = [
    { fecha: '01/11/2025', producto: 'Galletas Canario', estado: 'Entregado' },
    { fecha: '07/11/2025', producto: 'Libro Mordedor', estado: 'En camino' }
  ];

  listaDeseos: Deseo[] = [];

  constructor(
    private cauldronService: CauldronService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios de la lista de deseos
    this.wishlistService.deseos$.subscribe((items: Deseo[]) => {
      this.listaDeseos = items;
    });
  }

  editarInfo() {
    alert(`Alias: ${this.aliasMagico}\nDirección: ${this.direccionMagica}`);
  }

  salir() {
    alert('Has salido del perfil mágico.');
  }

  agregarAlCaldero(deseo: Deseo) {
    // Buscar el producto real por nombre en los productos del servicio
    const productoReal = this.wishlistService['products'].find(
      (p: Product) => p.name.toLowerCase() === deseo.name.toLowerCase()
    );

    if (productoReal) {
      this.cauldronService.addItem(productoReal);
      alert(`${productoReal.name} ha sido agregado al caldero mágico 🧙‍♂️`);
    } else {
      alert(`No se encontró el producto ${deseo.name} en el inventario 🕵️‍♀️`);
    }
  }

  eliminarDeseo(deseo: Deseo) {
    this.wishlistService.eliminarDeseo(deseo.id);
    alert(`${deseo.name} ha sido eliminado de tu lista de deseos 💨`);
  }
}
