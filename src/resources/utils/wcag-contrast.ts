/**
 * WCAG 2.1 Contrast Ratio Utilities
 * Calculates contrast ratios and validates WCAG compliance
 */

/**
 * Converts hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Converts RGB to relative luminance
 * Formula from WCAG 2.1: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates contrast ratio between two colors
 * Formula from WCAG 2.1: (L1 + 0.05) / (L2 + 0.05)
 * where L1 is the lighter color and L2 is the darker color
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if contrast ratio meets WCAG 2.1 AA standards
 * @param ratio - Contrast ratio to check
 * @param isLargeText - Whether the text is large (>= 18pt or >= 14pt bold)
 * @returns true if meets AA standard
 */
export function meetsWCAG_AA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Checks if contrast ratio meets WCAG 2.1 AAA standards
 * @param ratio - Contrast ratio to check
 * @param isLargeText - Whether the text is large (>= 18pt or >= 14pt bold)
 * @returns true if meets AAA standard
 */
export function meetsWCAG_AAA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Gets compliance level for a given contrast ratio
 */
export function getComplianceLevel(
  ratio: number,
  isLargeText: boolean = false
): 'AAA' | 'AA' | 'Fail' {
  if (meetsWCAG_AAA(ratio, isLargeText)) return 'AAA';
  if (meetsWCAG_AA(ratio, isLargeText)) return 'AA';
  return 'Fail';
}

/**
 * Calculates contrast ratios for a color against white and black backgrounds
 */
export function calculateContrastRatios(hex: string): {
  onWhite: number;
  onBlack: number;
  meetsAA_onWhite: boolean;
  meetsAA_onBlack: boolean;
} {
  const onWhite = getContrastRatio(hex, '#ffffff');
  const onBlack = getContrastRatio(hex, '#000000');

  return {
    onWhite: Math.round(onWhite * 100) / 100,
    onBlack: Math.round(onBlack * 100) / 100,
    meetsAA_onWhite: meetsWCAG_AA(onWhite),
    meetsAA_onBlack: meetsWCAG_AA(onBlack),
  };
}
