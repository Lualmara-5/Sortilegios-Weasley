import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService, Product } from '../../../services/products.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.css'],
})
export class EditProduct implements OnInit {
  productId!: number;
  product: Product | null = null;
  loading = true;
  saving = false;
  deleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe((p) => {
      // Si no existe, redirige al catálogo
      if (!p) {
        alert('El producto no existe.');
        this.router.navigate(['/catalogo']);
        return;
      }
      // Clonar para edición segura por two-way binding
      this.product = { ...p };
      // Defaults por si faltan en el JSON
      if (this.product.warning === undefined) this.product.warning = '';
      if (this.product.stock === undefined) this.product.stock = 0;
      this.loading = false;
    });
  }

  save() {
  if (!this.product) return;
  this.saving = true;

  // Sanitizar numéricos
  if (this.product.stock! < 0) this.product.stock = 0;

  this.productService.updateProduct(this.product).subscribe({
    next: () => {
      this.saving = false;
      alert(`Cambios guardados para: ${this.product?.name}`);
      // 🔁 Redirigir al catálogo después de guardar
      this.router.navigate(['/catalogo']);
    },
    error: (err) => {
      console.error(err);
      this.saving = false;
      alert('Ocurrió un error guardando los cambios.');
    }
  });
}

delete() {
  if (!this.product) return;
  const ok = confirm(`¿Seguro que deseas eliminar "${this.product.name}"?`);
  if (!ok) return;

  this.deleting = true;
  this.productService.deleteProduct(this.product.id).subscribe({
    next: () => {
      this.deleting = false;
      alert(' Producto eliminado.');
      // 🔁 Redirigir al catálogo después de eliminar
      this.router.navigate(['/catalogo']);
    },
    error: (err) => {
      console.error(err);
      this.deleting = false;
      alert(' Ocurrió un error eliminando el producto.');
    }
  });
}

  cancel() {
    // Vuelve a donde te convenga (catálogo, detalle, etc.)
    this.router.navigate(['/catalogo']);
  }
}