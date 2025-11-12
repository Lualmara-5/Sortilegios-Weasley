# Sortilegios Weasley

## Descripción General

**Sortilegios Weasley** es una aplicación web desarrollada en **Angular** que simula una tienda mágica inspirada en el universo de Harry Potter.  
Permite gestionar un catálogo de productos mágicos, con funcionalidades diferenciadas para **usuarios normales** y **administradores**.  

El proyecto incluye un sistema de autenticación básica, gestión de carrito (“Caldero Mágico”), reseñas, y un módulo de administración para crear, editar o eliminar productos, con persistencia en **LocalStorage**.

---

## Características Principales

### 1. Usuarios Generales
- Acceso al catálogo completo de productos.
- Visualización de detalles y reseñas.
- Posibilidad de añadir artículos al “Caldero Mágico”.
- Interfaz adaptada al modo usuario (sin opciones administrativas).

### 2. Administradores
- Acceso a un panel adicional visible tras iniciar sesión con credenciales de administrador.
- Opción **“Agregar producto”** desde la barra de navegación.
- Botón **“Editar producto”** visible en cada tarjeta del catálogo.
- Formularios completos para agregar, editar o eliminar productos.
- Persistencia de los cambios mediante almacenamiento local (LocalStorage).

---

## Tecnologías Utilizadas

- **Framework:** Angular 17  
- **Lenguajes:** TypeScript, HTML5, CSS3  
- **Arquitectura:** Standalone Components  
- **Persistencia:** LocalStorage (con inicialización desde JSON local)  
- **Gestión de dependencias:** Node.js + npm  
- **Routing:** Angular Router  
- **Estilo visual:** CSS personalizado con gradientes y tipografía temática  

---

## Estructura de Carpetas Relevante

```
src/
│
├── app/
│   ├── pages/
│   │   ├── login/
│   │   ├── products/
│   │   │   ├── product-card/
│   │   │   ├── product-detail/
│   │   │   └── reviews/
│   │   ├── add-product/
│   │   └── admin/
│   │       └── edit-product/
│   └── services/
│       ├── products.service.ts
│       ├── reviews.service.ts
│       └── user.service.ts
│
└── assets/
    ├── data/
    │   └── products.json
    └── img/
```

---

## Instalación y Ejecución

### 1. Requisitos Previos
Asegúrese de tener instalados:
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### 2. Clonación e Instalación
Ejecute los siguientes comandos en la terminal:

```bash
git clone <URL_DEL_REPOSITORIO>
cd sortilegios-weasley
npm install
```

### 3. Ejecución del Servidor de Desarrollo
Inicie el servidor con:

```bash
ng serve
```

Luego, abra el navegador en:

```
http://localhost:4200/
```

---

## Credenciales de Prueba

**Administradores:**
| Usuario | Contraseña |
|----------|-------------|
| `GeorgeWeasley01` | `lordkakadura123` |
| `FredWeasley02`   | `elministerioapesta123` |

**Usuarios normales:**  
Puede registrarse desde la opción “Únete a la madriguera”.

---

## Persistencia y Datos

- Los productos se cargan inicialmente desde `assets/data/products.json`.
- Al modificarse (añadir, editar o eliminar), los cambios se guardan en `LocalStorage` bajo la clave:
  ```
  weasley-products
  ```
- Si se desea restablecer los valores originales, se puede ejecutar el método `resetToDefault()` del servicio `ProductsService`.

---

## Instrucciones para el Profesor / Evaluador

1. **Login como administrador** para acceder a las funcionalidades de gestión.
2. **Agregar un nuevo producto** y verificar que se muestra en el catálogo.
3. **Editar o eliminar un producto existente** y confirmar la persistencia tras recargar la página.
4. **Probar con un usuario normal** (sin credenciales de administrador) y verificar que no aparecen botones de administración.
5. **Revisar reseñas** y la funcionalidad del “Caldero Mágico”.

---

## Autores

Proyecto académico desarrollado por estudiantes de **Ingeniería de Sistemas e Informática** 
Juan Felipe Miranda Arciniegas
Luis Martinez
Kevin Ramos
Daniel Garzon
**Universidad Nacional de Colombia – Sede Medellín**  
Año: 2025

---

## Licencia

Uso académico con fines educativos.  
Prohibida su distribución comercial sin autorización de los autores.
