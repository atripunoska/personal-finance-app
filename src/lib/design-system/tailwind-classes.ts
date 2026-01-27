/**
 * Personal Finance App - Tailwind Class Mappings
 *
 * Utility functions and class mappings for using design system tokens
 * with Tailwind CSS classes.
 */

/**
 * Semantic Tailwind class mappings for common design patterns
 */
export const tw = {
  // Text colors
  text: {
    primary: 'text-grey-900',
    secondary: 'text-grey-500',
    muted: 'text-beige-500',
    disabled: 'text-grey-300',
    inverse: 'text-white',
    success: 'text-green',
    error: 'text-red',
    warning: 'text-yellow',
    info: 'text-blue',
  },

  // Background colors
  bg: {
    page: 'bg-beige-100',
    card: 'bg-white',
    muted: 'bg-grey-100',
    overlay: 'bg-grey-900/90',
    success: 'bg-green',
    error: 'bg-red',
    warning: 'bg-yellow',
    info: 'bg-blue',
  },

  // Border colors
  border: {
    default: 'border-grey-300',
    muted: 'border-grey-100',
    focus: 'border-grey-900',
    error: 'border-red',
  },

  // Typography presets
  typography: {
    display: 'text-5xl font-bold leading-tight tracking-tight',
    h1: 'text-4xl font-bold leading-tight',
    h2: 'text-3xl font-bold leading-tight',
    h3: 'text-2xl font-semibold leading-tight',
    h4: 'text-xl font-semibold leading-tight',
    h5: 'text-lg font-medium leading-normal',
    bodyLarge: 'text-lg font-normal leading-relaxed',
    body: 'text-base font-normal leading-normal',
    bodySmall: 'text-sm font-normal leading-normal',
    label: 'text-sm font-medium leading-normal',
    caption: 'text-xs font-normal leading-normal text-grey-500',
    button: 'text-sm font-semibold leading-normal',
  },

  // Spacing presets (common patterns)
  spacing: {
    pageX: 'px-4 md:px-6 lg:px-8',
    pageY: 'py-6 md:py-8',
    section: 'space-y-6 md:space-y-8',
    card: 'p-4 md:p-6',
    cardGap: 'gap-4',
    componentGap: 'gap-2',
    formGap: 'space-y-4',
  },

  // Border radius presets
  radius: {
    sm: 'rounded-sm',     // 4px
    md: 'rounded-md',     // 6px
    lg: 'rounded-lg',     // 8px
    xl: 'rounded-xl',     // 12px
    '2xl': 'rounded-2xl', // 16px
    full: 'rounded-full', // pill/circle
  },

  // Shadow presets
  shadow: {
    none: 'shadow-none',
    xs: 'shadow-xs',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },

  // Transition presets
  transition: {
    default: 'transition-all duration-200 ease-in-out',
    fast: 'transition-all duration-150 ease-in-out',
    slow: 'transition-all duration-300 ease-in-out',
    colors: 'transition-colors duration-200 ease-in-out',
    transform: 'transition-transform duration-200 ease-in-out',
  },

  // Interactive states
  interactive: {
    hover: 'hover:bg-grey-100',
    active: 'active:bg-grey-200',
    focus: 'focus:outline-none focus:ring-2 focus:ring-grey-900/20',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },

  // Component patterns
  patterns: {
    // Card pattern
    card: 'bg-white rounded-lg shadow-sm p-6',
    cardHover: 'bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow',

    // Input pattern
    input:
      'h-11 px-3 text-sm border border-grey-300 rounded-md bg-white ' +
      'placeholder:text-beige-500 focus:border-grey-900 focus:ring-2 focus:ring-grey-900/10 ' +
      'transition-colors',

    // Button base
    buttonBase:
      'inline-flex items-center justify-center font-semibold text-sm rounded-md ' +
      'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',

    // Avatar pattern
    avatar: 'rounded-full bg-cyan flex items-center justify-center font-semibold text-grey-900',

    // Badge pattern
    badge: 'inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full',

    // Progress bar
    progressTrack: 'h-2 bg-grey-100 rounded-full overflow-hidden',
    progressFill: 'h-full rounded-full transition-all duration-300',
  },
} as const;

/**
 * Theme color class mappings for budgets and pots
 * Maps hex colors to Tailwind class names
 */
export const themeColorClasses = {
  '#82C9D7': { bg: 'bg-cyan', text: 'text-cyan', border: 'border-cyan' },
  '#F2CDAC': { bg: 'bg-yellow', text: 'text-yellow', border: 'border-yellow' },
  '#277C78': { bg: 'bg-green', text: 'text-green', border: 'border-green' },
  '#626070': { bg: 'bg-navy', text: 'text-navy', border: 'border-navy' },
  '#826CB0': { bg: 'bg-purple', text: 'text-purple', border: 'border-purple' },
  '#BE6C49': { bg: 'bg-orange', text: 'text-orange', border: 'border-orange' },
  '#CAB361': { bg: 'bg-gold', text: 'text-gold', border: 'border-gold' },
  '#934F6F': { bg: 'bg-magenta', text: 'text-magenta', border: 'border-magenta' },
  '#3F82B2': { bg: 'bg-blue', text: 'text-blue', border: 'border-blue' },
  '#97A0AC': { bg: 'bg-navy-grey', text: 'text-navy-grey', border: 'border-navy-grey' },
  '#7F9161': { bg: 'bg-army-green', text: 'text-army-green', border: 'border-army-green' },
  '#93674F': { bg: 'bg-brown', text: 'text-brown', border: 'border-brown' },
  '#C94736': { bg: 'bg-red', text: 'text-red', border: 'border-red' },
  '#597C7C': { bg: 'bg-turquoise', text: 'text-turquoise', border: 'border-turquoise' },
} as const;

/**
 * Get Tailwind classes for a theme color
 * @param hexColor - The hex color code (e.g., '#82C9D7')
 * @param type - The type of class to return ('bg', 'text', or 'border')
 * @returns The Tailwind class or undefined if not found
 */
export function getThemeColorClass(
  hexColor: string,
  type: 'bg' | 'text' | 'border' = 'bg'
): string | undefined {
  const normalizedHex = hexColor.toUpperCase();
  const colorClasses = themeColorClasses[normalizedHex as keyof typeof themeColorClasses];
  return colorClasses?.[type];
}

/**
 * Button variant classes
 */
export const buttonVariants = {
  primary: 'bg-grey-900 text-white hover:bg-grey-500',
  secondary: 'bg-grey-100 text-grey-900 hover:bg-grey-300',
  destructive: 'bg-red text-white hover:bg-red/80',
  outline: 'border border-grey-300 text-grey-900 hover:bg-beige-100',
  ghost: 'text-grey-900 hover:bg-grey-100',
  link: 'text-grey-900 underline-offset-4 hover:underline',
} as const;

/**
 * Button size classes
 */
export const buttonSizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10',
} as const;

/**
 * Badge variant classes
 */
export const badgeVariants = {
  success: 'bg-green/15 text-green',
  warning: 'bg-yellow/40 text-yellow-foreground',
  error: 'bg-red/15 text-red',
  info: 'bg-blue/15 text-blue',
  neutral: 'bg-grey-100 text-grey-500',
} as const;

/**
 * Avatar size classes
 */
export const avatarSizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
} as const;
