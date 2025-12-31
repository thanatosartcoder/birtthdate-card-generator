/**
 * Script to generate Tailwind CSS color utilities
 * Generates ~540 utility classes for 15 color palettes with 9 variants each
 *
 * Run with: npx tsx scripts/generate-color-utilities.ts
 */

import { colorPalettes } from '../src/resources/config/colors';
import { writeFileSync } from 'fs';
import { join } from 'path';

type UtilityType = 'bg' | 'text' | 'border' | 'via' | 'hover:bg';

/**
 * Generates CSS utility class content
 */
function generateUtility(
  type: UtilityType,
  colorName: string,
  variant: number,
  hex: string
): string {
  const className = `${type}-${colorName}-${variant}`;

  switch (type) {
    case 'bg':
      return `  .${className} { background-color: ${hex}; }`;

    case 'text':
      return `  .${className} { color: ${hex}; }`;

    case 'border':
      return `  .${className} { border-color: ${hex}; }`;

    case 'via':
      return `  .${className} { --tw-gradient-stops: var(--tw-gradient-from), ${hex} var(--tw-gradient-via-position), var(--tw-gradient-to); }`;

    case 'hover:bg':
      return `  .hover\\:${className.replace('hover:', '')}:hover { background-color: ${hex}; }`;

    default:
      return '';
  }
}

/**
 * Generates all utilities for all colors
 */
function generateAllUtilities(): string {
  const utilities: string[] = [];
  const variantNumbers = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  // Header comment
  utilities.push('/* Safelist de colores dinámicos para el generador de tarjetas */');
  utilities.push('/* 15 paletas × 9 variantes × 5 utilidades = 540 clases */');
  utilities.push('@layer utilities {');

  // Background colors
  utilities.push('  /* Background colors */');
  for (const [colorName, palette] of Object.entries(colorPalettes)) {
    for (const variant of variantNumbers) {
      const hex = palette.variants[variant as keyof typeof palette.variants].value;
      utilities.push(generateUtility('bg', colorName, variant, hex));
    }
  }
  utilities.push('');

  // Gradient via colors
  utilities.push('  /* Gradient via colors */');
  for (const [colorName, palette] of Object.entries(colorPalettes)) {
    for (const variant of variantNumbers) {
      const hex = palette.variants[variant as keyof typeof palette.variants].value;
      utilities.push(generateUtility('via', colorName, variant, hex));
    }
  }
  utilities.push('');

  // Text colors
  utilities.push('  /* Text colors */');
  for (const [colorName, palette] of Object.entries(colorPalettes)) {
    for (const variant of variantNumbers) {
      const hex = palette.variants[variant as keyof typeof palette.variants].value;
      utilities.push(generateUtility('text', colorName, variant, hex));
    }
  }
  utilities.push('');

  // Border colors
  utilities.push('  /* Border colors */');
  for (const [colorName, palette] of Object.entries(colorPalettes)) {
    for (const variant of variantNumbers) {
      const hex = palette.variants[variant as keyof typeof palette.variants].value;
      utilities.push(generateUtility('border', colorName, variant, hex));
    }
  }
  utilities.push('');

  // Hover variants
  utilities.push('  /* Hover variants */');
  for (const [colorName, palette] of Object.entries(colorPalettes)) {
    for (const variant of variantNumbers) {
      const hex = palette.variants[variant as keyof typeof palette.variants].value;
      utilities.push(generateUtility('hover:bg', colorName, variant, hex));
    }
  }
  utilities.push('');

  // Add hover:text-white
  utilities.push('  .hover\\:text-white:hover { color: #fff; }');
  utilities.push('}');

  return utilities.join('\n');
}

/**
 * Main function
 */
function main() {
  console.log('🎨 Generating Tailwind CSS color utilities...');

  const colorUtilities = generateAllUtilities();
  const outputPath = join(process.cwd(), 'src', 'styles', 'tailwind-colors.css');

  // Generate complete CSS file with import and animations
  const fullCSS = `@import "tailwindcss";

${colorUtilities}

/* Animaciones personalizadas de @midudev/tailwind-animations */
@layer utilities {
  /* Fade in */
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in;
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out;
  }

  .animate-delay-500 {
    animation-delay: 0.5s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
`;

  writeFileSync(outputPath, fullCSS, 'utf-8');

  console.log('✅ Generated color utilities:');
  console.log(`   - 15 color palettes`);
  console.log(`   - 9 variants per palette (100-900)`);
  console.log(`   - 5 utility types (bg, text, border, via, hover:bg)`);
  console.log(`   - Total: ~540 classes`);
  console.log(`\n📁 Output: ${outputPath}`);
  console.log('\n💡 Next step: Update MainLayout.astro to import "tailwind-colors.css" instead of "tailwind.css"');
}

main();
