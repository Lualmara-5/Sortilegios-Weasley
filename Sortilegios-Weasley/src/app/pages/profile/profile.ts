import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CauldronService } from '../../services/cualdron.service';
import { Product } from '../../services/products.service';

interface Pedido {
  fecha: string;
  producto: string;
  estado: string;
}

interface Deseo {
  nombre: string;
  imagen: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  aliasMagico = 'Brujo_123';
  direccionMagica = 'Callejón Diagon #7¾';

  constructor(private cauldronService: CauldronService) {}



  pedidos: Pedido[] = [
    { fecha: 'Septiembre 13, 2025', producto: 'Libro de Hechizos', estado: 'En camino' },
    { fecha: 'Agosto 26, 2025', producto: 'Pluma Invisible', estado: 'Entregado' },
    { fecha: 'Agosto 3, 2025', producto: 'Capa de Invisibilidad', estado: 'Entregado' },
    { fecha: 'Julio 12, 2025', producto: 'Lord Kakadura', estado: 'Entregado' }
  ];

  listaDeseos: Deseo[] = [
    { nombre: 'Pluma Invisible', imagen: 'assets/img/pluma.png' },
    { nombre: 'Varitas falsas', imagen: 'assets/img/varitas.png' },
    { nombre: 'Capa burlona', imagen: 'assets/img/capa.png' }
  ];

  editarInfo() {
    console.log('Editar información mágica...');
  }

  salir() {
    console.log('Cerrando sesión...');
  }

  agregarAlCaldero(producto: Deseo) {
    console.log(`Agregado ${producto} al caldero mágico 🪄`);
    this.cauldronService.addItem(producto)
  }

  eliminarDeseo(nombre: string) {
    this.listaDeseos = this.listaDeseos.filter(d => d.nombre !== nombre);
  }
}
