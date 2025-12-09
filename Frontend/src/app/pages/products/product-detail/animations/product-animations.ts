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
    animationType: 'canvas',
    cssClass: 'animation-ears-extend',
    description: 'Las orejas se extienden con ondas de sonido mágicas'
  },

  // 6. Pantano portátil
  6: {
    id: 6,
    animationType: 'canvas',
    componentName: 'portable-swamp',
    description: 'Un pantano mágico se expande con burbujas y plantas'
  },

    // 7. Sombreros acéfalos
  7: {
    id: 7,
    animationType: 'canvas',
    componentName: 'headless-hat',
    description: 'El sombrero hace desaparecer la cabeza mágicamente'
  },

    // 8. Bombones desmayo - Animación de desmayo con estrellas
  8: {
    id: 8,
    animationType: 'canvas',
    componentName: 'fainting-bonbon',
    description: '¡Desmayo instantáneo con efectos mágicos y estrellas!'
  },

    // 9. Pastillas vomitivas - Náusea mágica con espirales verdes
  9: {
    id: 9,
    animationType: 'canvas',
    componentName: 'vomit-pills',
    description: '¡Náuseas instantáneas con espirales mágicos verdes!'
  },
 // 10. Turron sangranarices - Hemorragia mágica por la nariz
    10: {
    id: 10,
    animationType: 'canvas',
    componentName: 'turron-sangranarices',
    description: 'Provoca una considerable hemorragia nasal temporal'
  },
  // 11. Caramelo de la fiebre
    11: {
    id: 11,
    animationType: 'canvas',
    componentName: 'caramelo-fiebre',
    description: 'Aumenta la temperatura corporal causando fiebre temporal'
  },
  // 12. Manantial de sangre
    12: {
    id: 12,
    animationType: 'canvas',
    componentName: 'manantial-sangre',
    description: 'Caramelos que provocan una gran hemorragia nasal mágica'
  },
    // 13. Varitas falsas - Transformación en plátano
  13: {
    id: 13,
    animationType: 'canvas',
    componentName: 'fake-wand-banana',
    description: '¡La varita se transforma en un plátano de goma ridículo!'
  },
    // 14. Caramelos de la verdad - Efecto de verdad mágico
  14: {
    id: 14,
    animationType: 'canvas',
    componentName: 'truth-candy',
    description: '¡La verdad siempre sale a la luz con burbujas mágicas!'
  },
  // 15. Chocolate rompedientes - Mordida imposible
  15: {
    id: 15,
    animationType: 'canvas',
    componentName: 'chocolate-breaking-teeth',
    description: '¡Chocolate imposible de morder que provoca un rebote caricaturesco!'
  },
  // 16. Libro mordedor - Libro con dientes juguetón
  16: {
    id: 16,
    animationType: 'canvas',
    componentName: 'biting-book',
    description: '¡Libro mágico que intenta morder con dientes afilados!'
  },
    // 17. Pergamino inservible - Texto que desaparece
  17: {
    id: 17,
    animationType: 'canvas',
    componentName: 'useless-parchment',
    description: '¡Todo lo que se escriba desaparece al instante en partículas mágicas!'
  },
    // 18. Pluma invisible - Tinta que desaparece
  18: {
    id: 18,
    animationType: 'canvas',
    componentName: 'invisible-ink-quill',
    description: '¡La tinta desaparece a los 10 minutos! Perfecta para mensajes temporales.'
  },
    // 19. Spray aumenta todo - Efecto de agrandamiento
  19: {
    id: 19,
    animationType: 'canvas',
    componentName: 'enlarging-spray',
    description: '¡Rocía y agranda cualquier objeto! Efecto de hasta tres días.'
  },
    // 20. Varitas del revés - Contrahechizo boomerang
  20: {
    id: 20,
    animationType: 'canvas',
    componentName: 'reverse-wand',
    description: '¡Lanzan el contrahechizo del conjuro que realmente se quiere usar!'
  },
};

export function getProductAnimation(productId: number): ProductAnimation | null {
  return PRODUCT_ANIMATIONS[productId] || null;
}

export function hasAnimation(productId: number): boolean {
  return !!PRODUCT_ANIMATIONS[productId];
}