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

  aliasMagico: string = '';
  mailMagico: string = '';
  direccionMagica: string = '';

  usuarioActual: any = null;
  pedidos: any[] = [];
  listaDeseos: Deseo[] = [];
  wishlist: Deseo[] = [];

  constructor(
    private cauldronService: CauldronService,
    private wishlistService: WishlistService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // 🔹 Leer usuario logueado desde localStorage
    this.usuarioActual = this.userService.getUser();
    if (!this.usuarioActual) {
      this.router.navigate(['/login']);
      return;
    }

    const userDetails = this.usuarioActual.usuario;

    this.aliasMagico = userDetails.nickname || '';
    this.mailMagico = userDetails.mail || '';
    this.direccionMagica = userDetails.direccion || '';

    // Lista de deseos
    this.wishlistService.deseos$.subscribe((items: Deseo[]) => {
      this.listaDeseos = items;
      this.wishlist = items;
    });

    const guardado = localStorage.getItem('wishlist');
    if (guardado) {
      const data = JSON.parse(guardado);
      this.listaDeseos = data;
      this.wishlist = data;
    }
  }

  // Guardar información en backend
  guardarCambios() {
    console.log(this.usuarioActual);
    const usuarioID = this.usuarioActual.usuario.id_usuario;

    const nuevosDatos = {
      nickname: this.aliasMagico,
      mail: this.mailMagico,
      direccion: this.direccionMagica
    };

    this.userService.updateUser(usuarioID, nuevosDatos).subscribe({
      next: (res) => {
        alert('¡Información actualizada con éxito!');
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        alert('No fue posible actualizar tu información mágica 🧙‍♂️');
      }
    });
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
