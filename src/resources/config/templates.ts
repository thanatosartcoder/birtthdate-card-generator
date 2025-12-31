/**
 * Plantillas prediseñadas para tarjetas de cumpleaños
 * 8 diseños con combinaciones predefinidas de colores y fuentes
 */

export type TemplateConfig = {
  id: string;
  name: string;
  description: string;
  category: 'elegant' | 'fun' | 'minimal' | 'retro' | 'modern' | 'classic' | 'romantic' | 'bold';
  previewImage: string; // URL de imagen de preview
  config: {
    colorPalette: string; // formato: "indigo-700"
    font: string; // "bebas-neue" | "press-start" | "montserrat" etc.
    fontWeight: number; // 100-900
    layout: 'centered' | 'side-by-side' | 'stacked';
    animations: {
      enabled: boolean;
      type: 'confetti' | 'fireworks' | 'none';
    };
  };
};

export const cardTemplates: TemplateConfig[] = [
  {
    id: 'elegant-serif',
    name: 'Elegancia Clásica',
    description: 'Diseño sofisticado con tipografía serif y tonos índigo profundos',
    category: 'elegant',
    previewImage: '/templates/elegant-serif.jpg',
    config: {
      colorPalette: 'indigo-700',
      font: 'bebas-neue', // Placeholder - será "playfair" en Sprint 2
      fontWeight: 700,
      layout: 'centered',
      animations: {
        enabled: true,
        type: 'none',
      },
    },
  },
  {
    id: 'retro-arcade',
    name: 'Retro Arcade',
    description: 'Estilo pixel art con colores vibrantes fucsia',
    category: 'retro',
    previewImage: '/templates/retro-arcade.jpg',
    config: {
      colorPalette: 'fuchsia-500',
      font: 'press-start-2p',
      fontWeight: 400,
      layout: 'centered',
      animations: {
        enabled: true,
        type: 'fireworks',
      },
    },
  },
  {
    id: 'minimal-modern',
    name: 'Minimalista Moderno',
    description: 'Diseño limpio y contemporáneo con tonos cielo suaves',
    category: 'minimal',
    previewImage: '/templates/minimal-modern.jpg',
    config: {
      colorPalette: 'sky-400',
      font: 'bebas-neue', // Será "montserrat" weight 300
      fontWeight: 300,
      layout: 'stacked',
      animations: {
        enabled: false,
        type: 'none',
      },
    },
  },
  {
    id: 'romance-script',
    name: 'Romance Script',
    description: 'Tipografía cursiva elegante con rosa intenso',
    category: 'romantic',
    previewImage: '/templates/romance-script.jpg',
    config: {
      colorPalette: 'pink-600',
      font: 'bebas-neue', // Será "dancing-script"
      fontWeight: 700,
      layout: 'centered',
      animations: {
        enabled: true,
        type: 'confetti',
      },
    },
  },
  {
    id: 'vibrant-fun',
    name: 'Diversión Vibrante',
    description: 'Colores brillantes y energía con tonos ámbar',
    category: 'fun',
    previewImage: '/templates/vibrant-fun.jpg',
    config: {
      colorPalette: 'amber-500',
      font: 'bebas-neue',
      fontWeight: 700,
      layout: 'side-by-side',
      animations: {
        enabled: true,
        type: 'confetti',
      },
    },
  },
  {
    id: 'professional-clean',
    name: 'Profesional Limpio',
    description: 'Estilo corporativo con esmeralda y tipografía sans-serif',
    category: 'modern',
    previewImage: '/templates/professional-clean.jpg',
    config: {
      colorPalette: 'emerald-600',
      font: 'bebas-neue', // Será "montserrat" weight 500
      fontWeight: 500,
      layout: 'stacked',
      animations: {
        enabled: false,
        type: 'none',
      },
    },
  },
  {
    id: 'monochrome-bold',
    name: 'Monocromático Audaz',
    description: 'Diseño en blanco y negro con alto contraste',
    category: 'bold',
    previewImage: '/templates/monochrome-bold.jpg',
    config: {
      colorPalette: 'blue-900',
      font: 'bebas-neue',
      fontWeight: 900,
      layout: 'centered',
      animations: {
        enabled: true,
        type: 'fireworks',
      },
    },
  },
  {
    id: 'nature-organic',
    name: 'Naturaleza Orgánica',
    description: 'Tonos tierra con verde profundo y tipografía cálida',
    category: 'classic',
    previewImage: '/templates/nature-organic.jpg',
    config: {
      colorPalette: 'green-700',
      font: 'bebas-neue', // Será "playfair"
      fontWeight: 600,
      layout: 'centered',
      animations: {
        enabled: true,
        type: 'confetti',
      },
    },
  },
];

/**
 * Obtener una plantilla por ID
 */
export function getTemplateById(id: string): TemplateConfig | undefined {
  return cardTemplates.find((template) => template.id === id);
}

/**
 * Obtener plantillas por categoría
 */
export function getTemplatesByCategory(
  category: TemplateConfig['category']
): TemplateConfig[] {
  return cardTemplates.filter((template) => template.category === category);
}

/**
 * Obtener todas las categorías únicas
 */
export function getCategories(): TemplateConfig['category'][] {
  return Array.from(new Set(cardTemplates.map((t) => t.category)));
}

/**
 * Obtener todas las plantillas
 */
export function getAllTemplates(): TemplateConfig[] {
  return cardTemplates;
}
