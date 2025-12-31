/**
 * ColorPicker Component
 * Allows users to select a color palette and variant with WCAG accessibility validation
 * Two-column layout: palettes (left with scroll) + variants & preview (right)
 */

import { useState, useEffect } from 'react';
import { colorPalettes, getColorPalette } from '../../resources/config/colors';
import type { ColorPalette } from '../../resources/config/colors';

type ColorPickerProps = {
  value?: string; // format: "bg-pink-500"
  onChange: (value: string) => void;
  showVariants?: boolean; // show all 9 variants or just recommended
};

export default function ColorPicker({
  value = 'bg-pink-500',
  onChange,
  showVariants = true,
}: ColorPickerProps) {
  // Parse current value
  const parseColorValue = (val: string) => {
    const match = val.match(/bg-(\w+)-(\d+)/);
    if (match) {
      return { palette: match[1], variant: parseInt(match[2]) };
    }
    return { palette: 'pink', variant: 500 };
  };

  const [selectedPalette, setSelectedPalette] = useState(
    parseColorValue(value).palette
  );
  const [selectedVariant, setSelectedVariant] = useState(
    parseColorValue(value).variant
  );

  // Update when value prop changes
  useEffect(() => {
    const { palette, variant } = parseColorValue(value);
    setSelectedPalette(palette);
    setSelectedVariant(variant);
  }, [value]);

  const currentPalette = getColorPalette(selectedPalette);

  const handlePaletteClick = (paletteName: string) => {
    setSelectedPalette(paletteName);
    const palette = getColorPalette(paletteName);
    const recommendedVariant = palette?.recommended.light || 500;
    setSelectedVariant(recommendedVariant);
    onChange(`bg-${paletteName}-${recommendedVariant}`);
  };

  const handleVariantClick = (variant: number) => {
    setSelectedVariant(variant);
    onChange(`bg-${selectedPalette}-${variant}`);
  };

  const variants = showVariants
    ? [100, 200, 300, 400, 500, 600, 700, 800, 900]
    : currentPalette
    ? [currentPalette.recommended.light]
    : [500];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6"
      role="group"
      aria-label="Selector de color"
    >
      {/* LEFT COLUMN: Palette Selection with Scroll */}
      <div className="border-r pr-6">
        <label className="block text-lg font-medium mb-4">
          Paleta de colores
        </label>
        <div
          className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2"
          role="radiogroup"
          aria-label="Paletas de colores disponibles"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#ec4899 #f3f4f6'
          }}
        >
          {Object.entries(colorPalettes).map(([name, palette]) => {
            const isSelected = selectedPalette === name;
            const previewColor = palette.variants[500].value;

            return (
              <button
                key={name}
                type="button"
                onClick={() => handlePaletteClick(name)}
                className={`
                  group relative flex items-center gap-4 p-3 rounded-lg border-2 transition-all
                  ${
                    isSelected
                      ? 'border-gray-900 bg-gray-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                  }
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900
                `}
                role="radio"
                aria-checked={isSelected}
                aria-label={`${palette.displayName}`}
              >
                {/* Color circle */}
                <div
                  className="w-12 h-12 rounded-full shadow-sm flex-shrink-0"
                  style={{ backgroundColor: previewColor }}
                  aria-hidden="true"
                />

                {/* Label */}
                <div className="flex-1 text-left">
                  <p className="text-base font-semibold text-gray-900">
                    {palette.displayName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {name}
                  </p>
                </div>

                {/* Selected checkmark */}
                {isSelected && (
                  <div
                    className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0"
                    aria-label="Seleccionado"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Variants + Preview */}
      <div className="space-y-6">
        {/* Variant Selection */}
        {showVariants && currentPalette && (
          <div>
            <label className="block text-lg font-medium mb-4">
              Intensidad del color
            </label>
            <div className="space-y-3">
              {/* Variants Grid */}
              <div
                className="grid grid-cols-9 gap-2"
                role="radiogroup"
                aria-label="Tonos de color disponibles"
              >
                {variants.map((variant) => {
                  const variantKey = variant as keyof typeof currentPalette.variants;
                  const colorData = currentPalette.variants[variantKey];
                  const isSelected = selectedVariant === variant;

                  return (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => handleVariantClick(variant)}
                      className={`
                        relative group aspect-square rounded-lg border-2 transition-all
                        ${
                          isSelected
                            ? 'border-gray-900 ring-2 ring-gray-900 scale-110'
                            : 'border-gray-300 hover:border-gray-500 hover:scale-105'
                        }
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900
                      `}
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`Tono ${variant}, contraste ${colorData.onWhite.toFixed(
                        1
                      )}:1 sobre blanco`}
                      title={`${variant} - Contraste: ${colorData.onWhite.toFixed(1)}:1`}
                    >
                      <div
                        className="w-full h-full rounded-md"
                        style={{ backgroundColor: colorData.value }}
                        aria-hidden="true"
                      />

                      {/* WCAG Badge */}
                      {colorData.meetsAA_onWhite && (
                        <span
                          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                          title={`Cumple WCAG AA: ${colorData.onWhite.toFixed(1)}:1`}
                          aria-label={`Cumple estándar de accesibilidad WCAG AA`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Variant labels */}
              <div className="grid grid-cols-9 gap-2 text-center">
                {variants.map((variant) => (
                  <span key={variant} className="text-xs font-medium text-gray-600">
                    {variant}
                  </span>
                ))}
              </div>

              {/* Helper text */}
              <p className="text-xs text-gray-500 text-center mt-2">
                ← Más claro | Más oscuro →
              </p>
            </div>

            {/* Accessibility Info */}
            {currentPalette.variants[selectedVariant as keyof typeof currentPalette.variants] && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-blue-900 font-medium">
                      Contraste sobre blanco: {currentPalette.variants[
                        selectedVariant as keyof typeof currentPalette.variants
                      ].onWhite.toFixed(1)}:1
                      {currentPalette.variants[
                        selectedVariant as keyof typeof currentPalette.variants
                      ].meetsAA_onWhite && (
                        <span className="ml-2 text-green-600">
                          ✓ Cumple WCAG AA
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Estándar WCAG 2.1 AA requiere al menos 4.5:1 para texto normal
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Preview */}
        <div>
          <label className="block text-lg font-medium mb-4">Vista previa</label>
          <div
            className={`p-12 rounded-xl ${value} shadow-lg flex flex-col items-center justify-center gap-4 transition-all duration-300`}
          >
            <p className="text-white text-3xl md:text-4xl font-bold text-center drop-shadow-lg">
              ¡Feliz Cumpleaños!
            </p>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white text-sm font-medium">
                {currentPalette?.displayName} - {selectedVariant}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
