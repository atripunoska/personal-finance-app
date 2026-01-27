/**
 * Personal Finance App - Design System
 *
 * Central export for all design system tokens and utilities.
 * Import from '@/lib/design-system' in your components.
 *
 * @example
 * import { colors, typography, spacing } from '@/lib/design-system';
 * import { tw } from '@/lib/design-system';
 */

export {
  default as designTokens,
  colors,
  typography,
  textStyles,
  spacing,
  layoutSpacing,
  borderRadius,
  borderWidth,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  components,
  THEME_COLORS,
} from './tokens';

export { tw, themeColorClasses, getThemeColorClass } from './tailwind-classes';
