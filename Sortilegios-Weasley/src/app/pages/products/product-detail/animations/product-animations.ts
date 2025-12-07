// src/app/pages/products/product-detail/animations/product-animations.ts

export interface ProductAnimation {
  id: number;
  animationType: 'css' | 'canvas' | 'svg';
  componentName?: string; // Para animaciones complejas con componente dedicado
  cssClass?: string; // Para animaciones CSS simples
  description: string; // Descripción del efecto
}

/**
 * Configuración de animaciones para cada producto
 * Mapea el ID del producto con su animación específica
 */
export const PRODUCT_ANIMATIONS: Record<number, ProductAnimation> = {
  // 1. Caramelo longuilinguo - Lengua que se estira
  1: {
    id: 1,
    animationType: 'css',
    cssClass: 'animation-tongue-stretch',
    description: '¡La lengua se alarga 10 veces su tamaño normal!'
  },
  
  // 2. Galletas de canarios - Transformación en canario
  2: {
    id: 2,
    animationType: 'css',
    cssClass: 'animation-canary-transform',
    description: '¡Transformación instantánea en un canario!'
  },
  
  // 3. Magicaja básica - Fuegos artificiales
  3: {
    id: 3,
    animationType: 'canvas',
    componentName: 'fireworks-basic',
    description: 'Explosión de fuegos artificiales mágicos'
  },
  
  // 4. Deflagración deluxe - Fuegos artificiales deluxe
  4: {
    id: 4,
    animationType: 'canvas',
    componentName: 'fireworks-deluxe',
    description: 'Espectáculo pirotécnico de lujo'
  },
  
  // 5. Orejas extensibles
  5: {
    id: 5,
    animationType: 'css',
    cssClass: 'animation-ears-extend',
    description: 'Las orejas se extienden para escuchar conversaciones'
  },
  
  // 6. Pantano portátil
  6: {
    id: 6,
    animationType: 'css',
    cssClass: 'animation-swamp',
    description: 'Aparición de un pantano pegajoso'
  },
  
  // 7. Sombreros acéfalos
  7: {
    id: 7,
    animationType: 'css',
    cssClass: 'animation-headless',
    description: '¡La cabeza desaparece!'
  },
  
  // 8. Bombones desmayo
  8: {
    id: 8,
    animationType: 'css',
    cssClass: 'animation-faint',
    description: 'Desmayo dramático instantáneo'
  },
  
  // 9. Pastillas vomitivas
  9: {
    id: 9,
    animationType: 'css',
    cssClass: 'animation-vomit',
    description: 'Efectos de náusea y vómito'
  },
  
  // 10. Turrón sangranarices
  10: {
    id: 10,
    animationType: 'css',
    cssClass: 'animation-nosebleed',
    description: 'Hemorragia nasal considerable'
  },
  
  // 27. Pociones de amor
  27: {
    id: 27,
    animationType: 'css',
    cssClass: 'animation-love-potion',
    description: 'Corazones flotantes y efectos románticos'
  }
};

/**
 * Obtiene la configuración de animación para un producto
 */
export function getProductAnimation(productId: number): ProductAnimation | null {
  return PRODUCT_ANIMATIONS[productId] || null;
}

/**
 * Verifica si un producto tiene animación configurada
 */
export function hasAnimation(productId: number): boolean {
  return !!PRODUCT_ANIMATIONS[productId];
}