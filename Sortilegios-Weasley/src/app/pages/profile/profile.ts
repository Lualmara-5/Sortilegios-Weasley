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

  // 🔮 Datos mágicos del usuario
  aliasMagico = 'Mago Anónimo';
  direccionMagica = 'Callejón Diagon Nº93';

  // 📦 Pedidos de ejemplo
  pedidos = [
    { fecha: '01/11/2025', producto: 'Galletas Canario', estado: 'Entregado' },
    { fecha: '07/11/2025', producto: 'Libro Mordedor', estado: 'En camino' }
  ];

  // 💫 Lista de deseos y usuario
  listaDeseos: Deseo[] = [];
  usuarioActual: any = null;

  // 👇 NUEVA propiedad usada en el HTML (para evitar TS2339)
  wishlist: Deseo[] = [];

  constructor(
    private cauldronService: CauldronService,
    private wishlistService: WishlistService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // 🔹 Obtener usuario logueado desde 'currentUser'
    const currentUserJSON = localStorage.getItem('currentUser');
    if (!currentUserJSON) {
      // 🚨 Si no hay usuario, redirigir al login
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioActual = JSON.parse(currentUserJSON);
    console.log('Usuario logueado:', this.usuarioActual.username);

    // Inicializar alias y dirección
    this.aliasMagico = this.usuarioActual.alias || this.aliasMagico;
    this.direccionMagica = this.usuarioActual.direccion || this.direccionMagica;

    // 💖 Escuchar cambios en la lista de deseos (desde el servicio)
    this.wishlistService.deseos$.subscribe((items: Deseo[]) => {
      console.log('📜 Deseos cargados en el perfil:', items);
      this.listaDeseos = items;
      this.wishlist = items; // 🔹 Asegura que el HTML también reciba los datos
    });

    // Si hay deseos guardados en localStorage, cargarlos al iniciar
    const guardado = localStorage.getItem('wishlist');
    if (guardado) {
      const data = JSON.parse(guardado);
      this.listaDeseos = data;
      this.wishlist = data;
    }
  }

  editarInfo() {
    alert(`Alias: ${this.aliasMagico}\nDirección: ${this.direccionMagica}`);
    // Aquí podrías guardar los cambios en el storage si quieres persistencia
  }

  salir() {
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
