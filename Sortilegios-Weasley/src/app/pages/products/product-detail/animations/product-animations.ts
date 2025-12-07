// src/app/pages/products/product-detail/animations/product-animations.ts

export interface ProductAnimation {
  id: number;
  animationType: 'css' | 'canvas' | 'svg';
  componentName?: string;
  cssClass?: string;
  description: string;
}

export const PRODUCT_ANIMATIONS: Record<number, ProductAnimation> = {
  // 1. Caramelo longuilinguo - Lengua épica
  1: {
    id: 1,
    animationType: 'canvas',
    componentName: 'tongue-candy',
    description: '¡La lengua se alarga hasta 10 veces con efectos mágicos!'
  },
  
  // 2. Galletas de canarios - Transformación mágica
  2: {
    id: 2,
    animationType: 'canvas',
    cssClass: 'animation-canary-transform',
    description: '¡Transformación épica en un canario dorado!'
  },
  
  // 3. Magicaja básica - Fuegos artificiales
  3: {
    id: 3,
    animationType: 'canvas',
    componentName: 'fireworks-basic',
    description: 'Explosión espectacular de fuegos artificiales mágicos'
  },
  
  // 4. Deflagración deluxe - Fuegos artificiales deluxe
  4: {
    id: 4,
    animationType: 'canvas',
    componentName: 'fireworks-deluxe',
    description: 'Espectáculo pirotécnico de lujo con efectos premium'
  },
  
  // 5. Orejas extensibles - Orejas mágicas
  5: {
    id: 5,
    animationType: 'css',
    cssClass: 'animation-ears-extend',
    description: 'Las orejas se extienden con ondas de sonido mágicas'
  }
};

export function getProductAnimation(productId: number): ProductAnimation | null {
  return PRODUCT_ANIMATIONS[productId] || null;
}

export function hasAnimation(productId: number): boolean {
  return !!PRODUCT_ANIMATIONS[productId];
}