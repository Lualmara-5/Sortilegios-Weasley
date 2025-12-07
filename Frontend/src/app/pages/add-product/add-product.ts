import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProductsService, Product } from '../../services/products.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'],
})
export class AddProduct {
  form: {
    name: string;
    price: string;
    unit: string;
    description: string;
    category: string;
    image: string;
    warning?: string;
    stock: number;
  } = {
    name: '',
    price: '',
    unit: 'unidad',
    description: '',
    category: 'dulces mágicos',
    image: '',
    warning: '',
    stock: 0,
  };

  preview: string = 'assets/img/placeholder.png';
  saving = false;

  constructor(private products: ProductsService, private router: Router) {}

  onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      this.preview = dataUrl;
      this.form.image = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  cancel() {
    this.router.navigate(['/catalogo']);
  }

  async submit() {
    if (!this.form.name.trim() || !this.form.price.trim()) {
      alert('Nombre y precio son obligatorios.');
      return;
    }

    if (this.form.stock < 0) this.form.stock = 0;
    this.saving = true;

    try {
      await this.products.addProduct({
        id: 0,
        name: this.form.name.trim(),
        price: this.form.price.trim(),
        unit: this.form.unit.trim() || 'unidad',
        description: this.form.description.trim(),
        category: this.form.category,
        image: this.form.image || this.preview,
        warning: this.form.warning?.trim() || undefined,
        stock: this.form.stock,
      }).toPromise();

      alert('Producto agregado correctamente.');
      this.router.navigate(['/catalogo']);
    } catch (e) {
      console.error(e);
      alert('Ocurrió un error agregando el producto.');
    } finally {
      this.saving = false;
    }
  }
}