import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CauldronService } from '../../services/cualdron.service';
import { WishlistService, Deseo } from '../../services/wishlist.service';
import { Product } from '../../services/products.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  // 🔮 Datos del usuario
  aliasMagico: string = 'Mago Anónimo';
  mailMagico: string = 'email@dominio.com';
  direccionMagica: string = 'Callejón Diagon Nº93';

  // 📦 Pedidos de ejemplo
  pedidos = [
    { fecha: '01/11/2025', producto: 'Galletas Canario', estado: 'Entregado' },
    { fecha: '07/11/2025', producto: 'Libro Mordedor', estado: 'En camino' }
  ];

  // 💫 Lista de deseos
  listaDeseos: Deseo[] = [];
  wishlist: Deseo[] = [];

  // Usuario actual
  usuarioActual: any = null;

  constructor(
    private cauldronService: CauldronService,
    private wishlistService: WishlistService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // 🔹 Leer usuario logueado desde localStorage
    const currentUserJSON = localStorage.getItem('currentUser');
    if (!currentUserJSON) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioActual = JSON.parse(currentUserJSON);
    console.log('Usuario actual cargado:', this.usuarioActual);

    const userDetails = this.usuarioActual.usuario;

    // Inicializar datos visibles en el perfil
    this.aliasMagico = userDetails.nickname || this.aliasMagico;
    console.log('Alias mágico:', this.aliasMagico);
    this.mailMagico = userDetails.mail || this.mailMagico;
    this.direccionMagica = userDetails.direccion || this.direccionMagica;

    console.log('Usuario logueado:', this.usuarioActual);

    // Escuchar cambios en la lista de deseos
    this.wishlistService.deseos$.subscribe((items: Deseo[]) => {
      this.listaDeseos = items;
      this.wishlist = items;
    });

    // Cargar deseos guardados en localStorage
    const guardado = localStorage.getItem('wishlist');
    if (guardado) {
      const data = JSON.parse(guardado);
      this.listaDeseos = data;
      this.wishlist = data;
    }
  }

  editarInfo() {
    alert(`Alias: ${this.aliasMagico}\nMail: ${this.mailMagico}\nDirección: ${this.direccionMagica}`);
  }

  salir() {
    localStorage.removeItem('currentUser');
    this.userService.clearUser();
    alert('Has salido del perfil mágico.');
    this.router.navigate(['/login']);
  }

  agregarAlCaldero(deseo: Deseo) {
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
