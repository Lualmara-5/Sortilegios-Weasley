# 🧙‍♂️ Sortilegios Weasley – Tienda Mágica en Angular

Bienvenido a **Sortilegios Weasley**, una aplicación web inspirada en el universo mágico de Harry Potter.  
Desarrollada en **Angular**, esta tienda permite explorar productos encantados, ver detalles, leer reseñas de muggles y realizar una simulación de pago a través de **PayPal Sandbox**.

---

## 🌟 Características principales

- 🛍️ **Catálogo interactivo:** Listado de productos con imágenes, descripción y categorías.
- 🔮 **Detalles del producto:** Vista completa con animación o GIF del producto, información y reseñas.
- 💬 **Reseñas Muggle:** Sistema de reseñas por producto (predeterminadas y agregadas por usuarios), persistentes en **LocalStorage**.
- 🧺 **Carrito de compras (Caldero Mágico):** Añade, elimina y modifica cantidades.
- 💰 **Resumen y Checkout:** Confirmación de compra con cálculo de totales en **USD y COP**.
- 🪙 **Pasarela de pago simulada:** Integración con **PayPal Sandbox**.
- 🧠 **Diseño responsivo y temático:** Paleta y tipografía inspiradas en el universo mágico.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Descripción |
|-------------|-------------|
| **Angular 18+** | Framework principal para SPA |
| **RxJS** | Manejo de flujos reactivos (Observables) |
| **TypeScript** | Tipado estático y modularización |
| **PayPal SDK JS** | Pasarela de pago integrada |
| **LocalStorage API** | Persistencia de reseñas y carrito |
| **HTML5 / CSS3 (Responsive)** | Diseño moderno adaptativo |
| **Google Fonts (Cinzel Decorative)** | Tipografía mágica |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── services/
│   │   ├── products.service.ts       # Carga de productos desde JSON
│   │   ├── reviews.service.ts        # Gestión de reseñas (LocalStorage)
│   │   ├── cauldron.service.ts       # Manejo del carrito
│   ├── pages/
│   │   ├── catalogo/                 # Vista principal del catálogo
│   │   ├── products/
│   │   │   ├── product-detail/       # Detalle del producto + reseñas
│   │   │   ├── reviews/              # Vista extendida de reseñas
│   │   ├── cart/                     # Carrito de compras
│   │   ├── checkout/                 # Confirmar compra / PayPal
│   ├── app.routes.ts                 # Rutas de la aplicación
│   └── app.component.ts              # Componente raíz
│
├── assets/
│   ├── data/products.json            # Lista base de productos
│   ├── data/reviews.json             # Reseñas predeterminadas
│   ├── img/                          # Imágenes y GIFs mágicos
│
└── index.html                        # Carga del PayPal SDK y punto de entrada
```

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/sortilegios-weasley.git
cd sortilegios-weasley
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Ejecutar la aplicación
```bash
ng serve
```
Visita 👉 **http://localhost:4200**

---

## 💳 Configuración de PayPal Sandbox

1. Abre `index.html` y verifica que el SDK esté cargado:
   ```html
   <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD"></script>
   ```

2. Si tienes un **client-id** real de Sandbox, reemplázalo en la URL anterior.

3. El componente `checkout.ts` usará este SDK automáticamente cuando presiones **“Proceder con el pago”**.

---

## 💬 Sistema de reseñas

- Las reseñas predeterminadas están en:
  ```
  src/assets/data/reviews.json
  ```
- Las nuevas reseñas de usuarios se guardan localmente mediante:
  ```ts
  localStorage.setItem('weasley-reviews', JSON.stringify(reviews));
  ```
- Cada producto tiene su propio conjunto de reseñas identificadas por `productId`.

---

## 🧺 Carrito de compras (Caldero)

- Se guarda en:
  ```ts
  localStorage.setItem('weasley-cart', JSON.stringify(cartItems));
  ```
- Compatible con `checkout.ts` y `cart.ts`.
- Calcula totales en **COP** y **USD** con conversión dinámica (1 USD ≈ 4000 COP).

---

## 🎨 Diseño y estilos

Los colores principales están definidos en `:root`:
```css
:root {
  --color-bg: #1a0b2e;
  --color-primary: #ff6b00;
  --color-secondary: #a259ff;
  --color-accent: #ffd369;
  --color-text: #f8f8f8;
  --color-card: #26103d;
}
```

Tipografía mágica:
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');
font-family: 'Harry P', 'Cinzel Decorative', serif;
```

---

## 📸 Próximas mejoras

- [ ] Panel de administración para añadir productos mágicos.
- [ ] Persistencia de compras en Firebase o Supabase.
- [ ] Autenticación con Google o Hogwarts ID.
- [ ] Filtrado y búsqueda avanzada en el catálogo.
- [ ] Efectos mágicos con Three.js ✨.

---

## 👨‍💻 Equipo de desarrollo

| Integrante | Rol |
|-------------|------|
| **Juan Felipe Miranda Arciniegas** | Lógica principal, integración de PayPal y reseñas |
| **Compañeros de equipo** | Catálogo, carrito y diseño visual |

---

## 🪄 Licencia

Este proyecto fue desarrollado con fines **académicos** y recreativos.  
No está afiliado ni autorizado por **Warner Bros.**, **J.K. Rowling** ni **Wizarding World™**.

---

**✨ “No necesitas varita para lanzar una buena interfaz.” ✨**
