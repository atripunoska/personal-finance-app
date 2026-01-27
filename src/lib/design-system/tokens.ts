/**
 * Personal Finance App - Design System Tokens
 *
 * This file contains all design tokens for consistent styling across components.
 * Import these tokens instead of using hardcoded values.
 */

// ============================================================================
// COLOR SYSTEM
// ============================================================================

export const colors = {
  // Brand Colors
  brand: {
    primary: '#277C78',      // Green - primary actions, success states
    secondary: '#626070',    // Navy - secondary elements
    accent: '#82C9D7',       // Cyan - highlights, accents
  },

  // Neutral Palette (Beige/Grey scale)
  neutral: {
    50: '#FFFFFF',           // Pure white
    100: '#F8F4F0',          // Beige 100 - page background
    200: '#F2F2F2',          // Grey 100 - card backgrounds, dividers
    300: '#B3B3B3',          // Grey 300 - disabled, placeholders
    500: '#98908B',          // Beige 500 - muted text
    600: '#696868',          // Grey 500 - secondary text
    900: '#201F24',          // Grey 900 - primary text, headings
  },

  // Semantic Colors
  semantic: {
    success: '#277C78',      // Green - positive actions, income
    warning: '#F2CDAC',      // Yellow - warnings, pending
    error: '#C94736',        // Red - errors, expenses, destructive
    info: '#3F82B2',         // Blue - informational
  },

  // Category/Theme Colors (for budgets, pots, charts)
  themes: {
    cyan: '#82C9D7',
    yellow: '#F2CDAC',
    green: '#277C78',
    navy: '#626070',
    purple: '#826CB0',
    turquoise: '#597C7C',
    brown: '#93674F',
    magenta: '#934F6F',
    blue: '#3F82B2',
    navyGrey: '#97A0AC',
    armyGreen: '#7F9161',
    gold: '#CAB361',
    orange: '#BE6C49',
    red: '#C94736',
  },

  // Chart Palette (ordered for data visualization)
  chart: [
    '#277C78',  // Green
    '#82C9D7',  // Cyan
    '#F2CDAC',  // Yellow
    '#626070',  // Navy
    '#826CB0',  // Purple
    '#3F82B2',  // Blue
    '#BE6C49',  // Orange
    '#934F6F',  // Magenta
  ],
} as const;

// Theme colors array for dynamic selection (budgets, pots)
export const THEME_COLORS = [
  '#82C9D7',  // Cyan
  '#F2CDAC',  // Yellow
  '#277C78',  // Green
  '#626070',  // Navy
  '#826CB0',  // Purple
  '#BE6C49',  // Orange
  '#CAB361',  // Gold
  '#934F6F',  // Magenta
  '#3F82B2',  // Blue
  '#97A0AC',  // Navy Grey
  '#7F9161',  // Army Green
  '#93674F',  // Brown
] as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    sans: '"Public Sans", system-ui, -apple-system, sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace',
  },

  // Font Sizes (px to rem, base 16px)
  fontSize: {
    xs: '0.75rem',      // 12px - captions, labels
    sm: '0.875rem',     // 14px - body small, metadata
    base: '1rem',       // 16px - body text
    lg: '1.125rem',     // 18px - body large
    xl: '1.25rem',      // 20px - heading 5
    '2xl': '1.5rem',    // 24px - heading 4
    '3xl': '1.875rem',  // 30px - heading 3
    '4xl': '2.25rem',   // 36px - heading 2
    '5xl': '3rem',      // 48px - heading 1, display
  },

  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    tight: '1.25',      // headings
    normal: '1.5',      // body text
    relaxed: '1.75',    // readable paragraphs
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
} as const;

// Pre-defined text styles
export const textStyles = {
  // Display / Hero
  display: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },

  // Headings
  h1: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  },
  h2: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  },
  h3: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
  },
  h4: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
  },
  h5: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },

  // Body
  bodyLarge: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.relaxed,
  },
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },
  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },

  // UI Elements
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },
  button: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
} as const;

// Semantic spacing for common use cases
export const layoutSpacing = {
  // Page layout
  pageGutter: spacing[4],       // 16px - page side padding (mobile)
  pageGutterMd: spacing[6],     // 24px - page side padding (tablet)
  pageGutterLg: spacing[8],     // 32px - page side padding (desktop)

  // Section spacing
  sectionGap: spacing[6],       // 24px - gap between major sections
  sectionGapLg: spacing[8],     // 32px - larger section gaps

  // Card spacing
  cardPadding: spacing[4],      // 16px - internal card padding
  cardPaddingLg: spacing[6],    // 24px - larger card padding
  cardGap: spacing[4],          // 16px - gap between cards

  // Component spacing
  componentGap: spacing[2],     // 8px - gap within components
  componentGapLg: spacing[4],   // 16px - larger component gaps

  // Form spacing
  formGap: spacing[4],          // 16px - gap between form fields
  inputPaddingX: spacing[3],    // 12px - horizontal input padding
  inputPaddingY: spacing[2],    // 8px - vertical input padding
} as const;

// ============================================================================
// BORDERS & RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',      // 4px - small elements, tags
  md: '0.375rem',     // 6px - inputs, small buttons
  lg: '0.5rem',       // 8px - cards, modals (default)
  xl: '0.75rem',      // 12px - large cards
  '2xl': '1rem',      // 16px - prominent elements
  '3xl': '1.5rem',    // 24px - very large rounded
  full: '9999px',     // Fully rounded (pills, avatars)
} as const;

export const borderWidth = {
  0: '0',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

// ============================================================================
// TRANSITIONS & ANIMATIONS
// ============================================================================

export const transitions = {
  // Durations
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  // Timing Functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Pre-defined transitions
  default: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'color, background-color, border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
} as const;

// ============================================================================
// Z-INDEX
// ============================================================================

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  max: 9999,
} as const;

// ============================================================================
// COMPONENT TOKENS
// ============================================================================

export const components = {
  // Button variants
  button: {
    sizes: {
      sm: { height: '2rem', paddingX: spacing[3], fontSize: typography.fontSize.xs },
      md: { height: '2.5rem', paddingX: spacing[4], fontSize: typography.fontSize.sm },
      lg: { height: '3rem', paddingX: spacing[6], fontSize: typography.fontSize.base },
    },
    variants: {
      primary: {
        background: colors.neutral[900],
        color: colors.neutral[50],
        hoverBackground: colors.neutral[600],
      },
      secondary: {
        background: colors.neutral[200],
        color: colors.neutral[900],
        hoverBackground: colors.neutral[300],
      },
      outline: {
        background: 'transparent',
        color: colors.neutral[900],
        border: `1px solid ${colors.neutral[300]}`,
        hoverBackground: colors.neutral[100],
      },
      destructive: {
        background: colors.semantic.error,
        color: colors.neutral[50],
        hoverBackground: '#A83A2C',
      },
      ghost: {
        background: 'transparent',
        color: colors.neutral[900],
        hoverBackground: colors.neutral[200],
      },
    },
  },

  // Card
  card: {
    background: colors.neutral[50],
    borderRadius: borderRadius.lg,
    shadow: shadows.sm,
    padding: spacing[6],
  },

  // Input
  input: {
    height: '2.75rem',
    borderRadius: borderRadius.md,
    borderColor: colors.neutral[300],
    focusBorderColor: colors.neutral[900],
    backgroundColor: colors.neutral[50],
    placeholderColor: colors.neutral[500],
    paddingX: spacing[3],
  },

  // Progress bar
  progress: {
    height: '0.5rem',
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral[200],
  },

  // Avatar
  avatar: {
    sizes: {
      sm: '2rem',
      md: '2.5rem',
      lg: '3rem',
      xl: '4rem',
    },
    borderRadius: borderRadius.full,
  },

  // Badge
  badge: {
    borderRadius: borderRadius.full,
    paddingX: spacing[2],
    paddingY: spacing[0.5],
    fontSize: typography.fontSize.xs,
  },

  // Modal
  modal: {
    maxWidth: '32rem',
    borderRadius: borderRadius.xl,
    padding: spacing[6],
    backdropColor: 'rgba(32, 31, 36, 0.9)',
  },
} as const;

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

const designTokens = {
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
};

export default designTokens;
