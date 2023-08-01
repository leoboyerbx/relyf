import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetDaisy(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    easings: {
      'in-sine': 'cubic-bezier(0.47, 0, 0.745, 0.715)',
      'out-sine': 'cubic-bezier(0.39, 0.575, 0.565, 1)',
      'in-out-sine': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
      'in-quad': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
      'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      'in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      'in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      'in-quart': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
      'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
      'in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
      'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
      'in-out-quint': 'cubic-bezier(0.86, 0, 0.07, 1)',
      'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      'in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
      'in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
      'out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      'in-out-circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
      'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
})
