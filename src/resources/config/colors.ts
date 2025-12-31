/**
 * Color Palette Configuration for Birthday Card Generator
 * 15 color palettes with 9 variants each (100-900)
 * Includes WCAG 2.1 contrast ratios and accessibility metadata
 */

import { calculateContrastRatios } from '../utils/wcag-contrast';

export type ColorVariant = {
  value: string; // hex color
  rgb: string; // rgb values
  onWhite: number; // contrast ratio on white
  onBlack: number; // contrast ratio on black
  meetsAA_onWhite: boolean;
  meetsAA_onBlack: boolean;
};

export type ColorPalette = {
  name: string;
  displayName: string;
  variants: {
    100: ColorVariant;
    200: ColorVariant;
    300: ColorVariant;
    400: ColorVariant;
    500: ColorVariant;
    600: ColorVariant;
    700: ColorVariant;
    800: ColorVariant;
    900: ColorVariant;
  };
  recommended: {
    light: 500 | 600 | 700; // recommended for light theme
    dark: 400 | 500 | 600; // recommended for dark theme
  };
};

/**
 * Creates a color variant with calculated contrast ratios
 */
function createVariant(hex: string, rgb: string): ColorVariant {
  const { onWhite, onBlack, meetsAA_onWhite, meetsAA_onBlack } =
    calculateContrastRatios(hex);

  return {
    value: hex,
    rgb,
    onWhite,
    onBlack,
    meetsAA_onWhite,
    meetsAA_onBlack,
  };
}

/**
 * All 15 color palettes with 9 variants each
 */
export const colorPalettes: Record<string, ColorPalette> = {
  pink: {
    name: 'pink',
    displayName: 'Rosa',
    variants: {
      100: createVariant('#fce7f3', '252, 231, 243'),
      200: createVariant('#fbcfe8', '251, 207, 232'),
      300: createVariant('#f9a8d4', '249, 168, 212'),
      400: createVariant('#f472b6', '244, 114, 182'),
      500: createVariant('#ec4899', '236, 72, 153'),
      600: createVariant('#db2777', '219, 39, 119'),
      700: createVariant('#be185d', '190, 24, 93'),
      800: createVariant('#9d174d', '157, 23, 77'),
      900: createVariant('#831843', '131, 24, 67'),
    },
    recommended: { light: 500, dark: 400 },
  },

  red: {
    name: 'red',
    displayName: 'Rojo',
    variants: {
      100: createVariant('#fee2e2', '254, 226, 226'),
      200: createVariant('#fecaca', '254, 202, 202'),
      300: createVariant('#fca5a5', '252, 165, 165'),
      400: createVariant('#f87171', '248, 113, 113'),
      500: createVariant('#ef4444', '239, 68, 68'),
      600: createVariant('#dc2626', '220, 38, 38'),
      700: createVariant('#b91c1c', '185, 28, 28'),
      800: createVariant('#991b1b', '153, 27, 27'),
      900: createVariant('#7f1d1d', '127, 29, 29'),
    },
    recommended: { light: 500, dark: 400 },
  },

  orange: {
    name: 'orange',
    displayName: 'Naranja',
    variants: {
      100: createVariant('#ffedd5', '255, 237, 213'),
      200: createVariant('#fed7aa', '254, 215, 170'),
      300: createVariant('#fdba74', '253, 186, 116'),
      400: createVariant('#fb923c', '251, 146, 60'),
      500: createVariant('#f97316', '249, 115, 22'),
      600: createVariant('#ea580c', '234, 88, 12'),
      700: createVariant('#c2410c', '194, 65, 12'),
      800: createVariant('#9a3412', '154, 52, 18'),
      900: createVariant('#7c2d12', '124, 45, 18'),
    },
    recommended: { light: 500, dark: 400 },
  },

  amber: {
    name: 'amber',
    displayName: 'Ámbar',
    variants: {
      100: createVariant('#fef3c7', '254, 243, 199'),
      200: createVariant('#fde68a', '253, 230, 138'),
      300: createVariant('#fcd34d', '252, 211, 77'),
      400: createVariant('#fbbf24', '251, 191, 36'),
      500: createVariant('#f59e0b', '245, 158, 11'),
      600: createVariant('#d97706', '217, 119, 6'),
      700: createVariant('#b45309', '180, 83, 9'),
      800: createVariant('#92400e', '146, 64, 14'),
      900: createVariant('#78350f', '120, 53, 15'),
    },
    recommended: { light: 500, dark: 400 },
  },

  yellow: {
    name: 'yellow',
    displayName: 'Amarillo',
    variants: {
      100: createVariant('#fef9c3', '254, 249, 195'),
      200: createVariant('#fef08a', '254, 240, 138'),
      300: createVariant('#fde047', '253, 224, 71'),
      400: createVariant('#facc15', '250, 204, 21'),
      500: createVariant('#eab308', '234, 179, 8'),
      600: createVariant('#ca8a04', '202, 138, 4'),
      700: createVariant('#a16207', '161, 98, 7'),
      800: createVariant('#854d0e', '133, 77, 14'),
      900: createVariant('#713f12', '113, 63, 18'),
    },
    recommended: { light: 500, dark: 400 },
  },

  lime: {
    name: 'lime',
    displayName: 'Lima',
    variants: {
      100: createVariant('#ecfccb', '236, 252, 203'),
      200: createVariant('#d9f99d', '217, 249, 157'),
      300: createVariant('#bef264', '190, 242, 100'),
      400: createVariant('#a3e635', '163, 230, 53'),
      500: createVariant('#84cc16', '132, 204, 22'),
      600: createVariant('#65a30d', '101, 163, 13'),
      700: createVariant('#4d7c0f', '77, 124, 15'),
      800: createVariant('#3f6212', '63, 98, 18'),
      900: createVariant('#365314', '54, 83, 20'),
    },
    recommended: { light: 600, dark: 500 },
  },

  green: {
    name: 'green',
    displayName: 'Verde',
    variants: {
      100: createVariant('#dcfce7', '220, 252, 231'),
      200: createVariant('#bbf7d0', '187, 247, 208'),
      300: createVariant('#86efac', '134, 239, 172'),
      400: createVariant('#4ade80', '74, 222, 128'),
      500: createVariant('#22c55e', '34, 197, 94'),
      600: createVariant('#16a34a', '22, 163, 74'),
      700: createVariant('#15803d', '21, 128, 61'),
      800: createVariant('#166534', '22, 101, 52'),
      900: createVariant('#14532d', '20, 83, 45'),
    },
    recommended: { light: 500, dark: 400 },
  },

  emerald: {
    name: 'emerald',
    displayName: 'Esmeralda',
    variants: {
      100: createVariant('#d1fae5', '209, 250, 229'),
      200: createVariant('#a7f3d0', '167, 243, 208'),
      300: createVariant('#6ee7b7', '110, 231, 183'),
      400: createVariant('#34d399', '52, 211, 153'),
      500: createVariant('#10b981', '16, 185, 129'),
      600: createVariant('#059669', '5, 150, 105'),
      700: createVariant('#047857', '4, 120, 87'),
      800: createVariant('#065f46', '6, 95, 70'),
      900: createVariant('#064e3b', '6, 78, 59'),
    },
    recommended: { light: 500, dark: 400 },
  },

  teal: {
    name: 'teal',
    displayName: 'Turquesa',
    variants: {
      100: createVariant('#ccfbf1', '204, 251, 241'),
      200: createVariant('#99f6e4', '153, 246, 228'),
      300: createVariant('#5eead4', '94, 234, 212'),
      400: createVariant('#2dd4bf', '45, 212, 191'),
      500: createVariant('#14b8a6', '20, 184, 166'),
      600: createVariant('#0d9488', '13, 148, 136'),
      700: createVariant('#0f766e', '15, 118, 110'),
      800: createVariant('#115e59', '17, 94, 89'),
      900: createVariant('#134e4a', '19, 78, 74'),
    },
    recommended: { light: 500, dark: 400 },
  },

  cyan: {
    name: 'cyan',
    displayName: 'Cian',
    variants: {
      100: createVariant('#cffafe', '207, 250, 254'),
      200: createVariant('#a5f3fc', '165, 243, 252'),
      300: createVariant('#67e8f9', '103, 232, 249'),
      400: createVariant('#22d3ee', '34, 211, 238'),
      500: createVariant('#06b6d4', '6, 182, 212'),
      600: createVariant('#0891b2', '8, 145, 178'),
      700: createVariant('#0e7490', '14, 116, 144'),
      800: createVariant('#155e75', '21, 94, 117'),
      900: createVariant('#164e63', '22, 78, 99'),
    },
    recommended: { light: 500, dark: 400 },
  },

  sky: {
    name: 'sky',
    displayName: 'Cielo',
    variants: {
      100: createVariant('#e0f2fe', '224, 242, 254'),
      200: createVariant('#bae6fd', '186, 230, 253'),
      300: createVariant('#7dd3fc', '125, 211, 252'),
      400: createVariant('#38bdf8', '56, 189, 248'),
      500: createVariant('#0ea5e9', '14, 165, 233'),
      600: createVariant('#0284c7', '2, 132, 199'),
      700: createVariant('#0369a1', '3, 105, 161'),
      800: createVariant('#075985', '7, 89, 133'),
      900: createVariant('#0c4a6e', '12, 74, 110'),
    },
    recommended: { light: 500, dark: 400 },
  },

  blue: {
    name: 'blue',
    displayName: 'Azul',
    variants: {
      100: createVariant('#dbeafe', '219, 234, 254'),
      200: createVariant('#bfdbfe', '191, 219, 254'),
      300: createVariant('#93c5fd', '147, 197, 253'),
      400: createVariant('#60a5fa', '96, 165, 250'),
      500: createVariant('#3b82f6', '59, 130, 246'),
      600: createVariant('#2563eb', '37, 99, 235'),
      700: createVariant('#1d4ed8', '29, 78, 216'),
      800: createVariant('#1e40af', '30, 64, 175'),
      900: createVariant('#1e3a8a', '30, 58, 138'),
    },
    recommended: { light: 500, dark: 400 },
  },

  indigo: {
    name: 'indigo',
    displayName: 'Índigo',
    variants: {
      100: createVariant('#e0e7ff', '224, 231, 255'),
      200: createVariant('#c7d2fe', '199, 210, 254'),
      300: createVariant('#a5b4fc', '165, 180, 252'),
      400: createVariant('#818cf8', '129, 140, 248'),
      500: createVariant('#6366f1', '99, 102, 241'),
      600: createVariant('#4f46e5', '79, 70, 229'),
      700: createVariant('#4338ca', '67, 56, 202'),
      800: createVariant('#3730a3', '55, 48, 163'),
      900: createVariant('#312e81', '49, 46, 129'),
    },
    recommended: { light: 600, dark: 500 },
  },

  violet: {
    name: 'violet',
    displayName: 'Violeta',
    variants: {
      100: createVariant('#ede9fe', '237, 233, 254'),
      200: createVariant('#ddd6fe', '221, 214, 254'),
      300: createVariant('#c4b5fd', '196, 181, 253'),
      400: createVariant('#a78bfa', '167, 139, 250'),
      500: createVariant('#8b5cf6', '139, 92, 246'),
      600: createVariant('#7c3aed', '124, 58, 237'),
      700: createVariant('#6d28d9', '109, 40, 217'),
      800: createVariant('#5b21b6', '91, 33, 182'),
      900: createVariant('#4c1d95', '76, 29, 149'),
    },
    recommended: { light: 600, dark: 500 },
  },

  purple: {
    name: 'purple',
    displayName: 'Púrpura',
    variants: {
      100: createVariant('#f3e8ff', '243, 232, 255'),
      200: createVariant('#e9d5ff', '233, 213, 255'),
      300: createVariant('#d8b4fe', '216, 180, 254'),
      400: createVariant('#c084fc', '192, 132, 252'),
      500: createVariant('#a855f7', '168, 85, 247'),
      600: createVariant('#9333ea', '147, 51, 234'),
      700: createVariant('#7e22ce', '126, 34, 206'),
      800: createVariant('#6b21a8', '107, 33, 168'),
      900: createVariant('#581c87', '88, 28, 135'),
    },
    recommended: { light: 600, dark: 500 },
  },

  fuchsia: {
    name: 'fuchsia',
    displayName: 'Fucsia',
    variants: {
      100: createVariant('#fae8ff', '250, 232, 255'),
      200: createVariant('#f5d0fe', '245, 208, 254'),
      300: createVariant('#f0abfc', '240, 171, 252'),
      400: createVariant('#e879f9', '232, 121, 249'),
      500: createVariant('#d946ef', '217, 70, 239'),
      600: createVariant('#c026d3', '192, 38, 211'),
      700: createVariant('#a21caf', '162, 28, 175'),
      800: createVariant('#86198f', '134, 25, 143'),
      900: createVariant('#701a75', '112, 26, 117'),
    },
    recommended: { light: 500, dark: 400 },
  },
};

/**
 * Get all color names
 */
export const colorNames = Object.keys(colorPalettes);

/**
 * Get a specific color palette
 */
export function getColorPalette(name: string): ColorPalette | undefined {
  return colorPalettes[name];
}

/**
 * Get all palettes as an array
 */
export function getAllPalettes(): ColorPalette[] {
  return Object.values(colorPalettes);
}

/**
 * Get recommended variant for a palette based on theme
 */
export function getRecommendedVariant(
  paletteName: string,
  theme: 'light' | 'dark' = 'light'
): number {
  const palette = getColorPalette(paletteName);
  return palette ? palette.recommended[theme] : 500;
}
