export type ThemeId = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'cyan' | 'magenta' | 'purple' | 'green' | 'orange';

export type ThemeBase = 'light' | 'dark';

export type ColorAccent = 'cyan' | 'magenta' | 'purple' | 'green' | 'orange' | 'blue' | 'default';

export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeTypography {
  fontFamily: {
    sans: string;
    serif: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface Theme {
  id: ThemeId;
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: string;
  shadows: ThemeShadows;
}

export const themes: Record<ThemeId, Theme> = {
  light: {
    id: 'light',
    name: 'Light',
    colors: {
      primary: '221.2 83.2% 53.3%',
      primaryForeground: '210 40% 98%',
      secondary: '210 40% 96.1%',
      secondaryForeground: '222.2 47.4% 11.2%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      popover: '0 0% 100%',
      popoverForeground: '222.2 84% 4.9%',
      muted: '210 40% 96.1%',
      mutedForeground: '215.4 16.3% 46.9%',
      accent: '210 40% 96.1%',
      accentForeground: '222.2 47.4% 11.2%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '210 40% 98%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%',
      ring: '221.2 83.2% 53.3%',
    },
    typography: {
      fontFamily: {
        sans: 'Inter, system-ui, -apple-system, sans-serif',
        serif: 'Georgia, serif',
        mono: 'Fira Code, monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    borderRadius: '0.5rem',
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      primary: '217.2 91.2% 59.8%',
      primaryForeground: '222.2 47.4% 11.2%',
      secondary: '217.2 32.6% 17.5%',
      secondaryForeground: '210 40% 98%',
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '222.2 84% 4.9%',
      cardForeground: '210 40% 98%',
      popover: '222.2 84% 4.9%',
      popoverForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      accent: '217.2 32.6% 17.5%',
      accentForeground: '210 40% 98%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 40% 98%',
      border: '217.2 32.6% 17.5%',
      input: '217.2 32.6% 17.5%',
      ring: '224.3 76.3% 48%',
    },
    typography: {
      fontFamily: {
        sans: 'Inter, system-ui, -apple-system, sans-serif',
        serif: 'Georgia, serif',
        mono: 'Fira Code, monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    borderRadius: '0.5rem',
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
    },
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    colors: {
      primary: '198 93% 60%',
      primaryForeground: '210 40% 98%',
      secondary: '200 100% 85%',
      secondaryForeground: '198 100% 15%',
      background: '200 100% 98%',
      foreground: '198 100% 10%',
      card: '200 100% 100%',
      cardForeground: '198 100% 10%',
      popover: '200 100% 100%',
      popoverForeground: '198 100% 10%',
      muted: '200 100% 92%',
      mutedForeground: '198 100% 30%',
      accent: '198 93% 85%',
      accentForeground: '198 100% 15%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '210 40% 98%',
      border: '200 100% 88%',
      input: '200 100% 88%',
      ring: '198 93% 60%',
    },
    typography: {
      fontFamily: {
        sans: 'Inter, system-ui, -apple-system, sans-serif',
        serif: 'Georgia, serif',
        mono: 'Fira Code, monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    borderRadius: '0.5rem',
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 100, 200, 0.1)',
      md: '0 4px 6px -1px rgba(0, 100, 200, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 100, 200, 0.2)',
      xl: '0 20px 25px -5px rgba(0, 100, 200, 0.25)',
      '2xl': '0 25px 50px -12px rgba(0, 100, 200, 0.3)',
    },
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    colors: {
      primary: '142 76% 36%',
      primaryForeground: '210 40% 98%',
      secondary: '142 50% 85%',
      secondaryForeground: '142 100% 10%',
      background: '142 40% 98%',
      foreground: '142 100% 8%',
      card: '142 40% 100%',
      cardForeground: '142 100% 8%',
      popover: '142 40% 100%',
      popoverForeground: '142 100% 8%',
      muted: '142 40% 92%',
      mutedForeground: '142 100% 25%',
      accent: '142 50% 88%',
      accentForeground: '142 100% 10%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '210 40% 98%',
      border: '142 40% 88%',
      input: '142 40% 88%',
      ring: '142 76% 36%',
    },
    typography: {
      fontFamily: {
        sans: 'Inter, system-ui, -apple-system, sans-serif',
        serif: 'Georgia, serif',
        mono: 'Fira Code, monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    borderRadius: '0.5rem',
    shadows: {
      sm: '0 1px 2px 0 rgba(34, 139, 34, 0.1)',
      md: '0 4px 6px -1px rgba(34, 139, 34, 0.15)',
      lg: '0 10px 15px -3px rgba(34, 139, 34, 0.2)',
      xl: '0 20px 25px -5px rgba(34, 139, 34, 0.25)',
      '2xl': '0 25px 50px -12px rgba(34, 139, 34, 0.3)',
    },
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    colors: {
      primary: '25 95% 53%',
      primaryForeground: '210 40% 98%',
      secondary: '25 80% 85%',
      secondaryForeground: '25 100% 15%',
      background: '25 50% 98%',
      foreground: '25 100% 10%',
      card: '25 50% 100%',
      cardForeground: '25 100% 10%',
      popover: '25 50% 100%',
      popoverForeground: '25 100% 10%',
      muted: '25 50% 92%',
      mutedForeground: '25 100% 30%',
      accent: '25 80% 88%',
      accentForeground: '25 100% 15%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '210 40% 98%',
      border: '25 50% 88%',
      input: '25 50% 88%',
      ring: '25 95% 53%',
    },
    typography: {
      fontFamily: {
        sans: 'Inter, system-ui, -apple-system, sans-serif',
        serif: 'Georgia, serif',
        mono: 'Fira Code, monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    borderRadius: '0.5rem',
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 140, 0, 0.1)',
      md: '0 4px 6px -1px rgba(255, 140, 0, 0.15)',
      lg: '0 10px 15px -3px rgba(255, 140, 0, 0.2)',
      xl: '0 20px 25px -5px rgba(255, 140, 0, 0.25)',
      '2xl': '0 25px 50px -12px rgba(255, 140, 0, 0.3)',
    },
  },
  // Dark-Neon Themes
  cyan: {
    id: 'cyan',
    name: 'Cyan Neon',
    colors: {
      primary: '187 100% 50%',
      primaryForeground: '222.2 47.4% 11.2%',
      secondary: '187 80% 20%',
      secondaryForeground: '210 40% 98%',
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '217.2 32.6% 17.5%',
      cardForeground: '210 40% 98%',
      popover: '222.2 84% 4.9%',
      popoverForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      accent: '187 70% 25%',
      accentForeground: '210 40% 98%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 40% 98%',
      border: '187 60% 30%',
      input: '187 60% 30%',
      ring: '187 100% 50%',
    },
    typography: {
      fontFamily: {
        sans: '"Inter", system-ui, sans-serif',
        serif: '"Georgia", serif',
        mono: '"Fira Code", monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    borderRadius: '0rem',
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 255, 255, 0.3)',
      md: '0 4px 6px -1px rgba(0, 255, 255, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 255, 255, 0.5)',
      xl: '0 20px 25px -5px rgba(0, 255, 255, 0.6)',
      '2xl': '0 25px 50px -12px rgba(0, 255, 255, 0.7)',
    },
  },
  magenta: {
    id: 'magenta',
    name: 'Magenta Neon',
    colors: {
      primary: '300 100% 60%',
      primaryForeground: '210 40% 98%',
      secondary: '300 80% 20%',
      secondaryForeground: '210 40% 98%',
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '217.2 32.6% 17.5%',
      cardForeground: '210 40% 98%',
      popover: '222.2 84% 4.9%',
      popoverForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      accent: '300 70% 25%',
      accentForeground: '210 40% 98%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 40% 98%',
      border: '300 60% 30%',
      input: '300 60% 30%',
      ring: '300 100% 60%',
    },
    typography: {
      fontFamily: {
        sans: '"Inter", system-ui, sans-serif',
        serif: '"Georgia", serif',
        mono: '"Fira Code", monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    borderRadius: '0rem',
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 0, 255, 0.3)',
      md: '0 4px 6px -1px rgba(255, 0, 255, 0.4)',
      lg: '0 10px 15px -3px rgba(255, 0, 255, 0.5)',
      xl: '0 20px 25px -5px rgba(255, 0, 255, 0.6)',
      '2xl': '0 25px 50px -12px rgba(255, 0, 255, 0.7)',
    },
  },
  purple: {
    id: 'purple',
    name: 'Purple Neon',
    colors: {
      primary: '270 90% 65%',
      primaryForeground: '210 40% 98%',
      secondary: '270 70% 20%',
      secondaryForeground: '210 40% 98%',
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '217.2 32.6% 17.5%',
      cardForeground: '210 40% 98%',
      popover: '222.2 84% 4.9%',
      popoverForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      accent: '270 60% 25%',
      accentForeground: '210 40% 98%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 40% 98%',
      border: '270 50% 30%',
      input: '270 50% 30%',
      ring: '270 90% 65%',
    },
    typography: {
      fontFamily: {
        sans: '"Inter", system-ui, sans-serif',
        serif: '"Georgia", serif',
        mono: '"Fira Code", monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    borderRadius: '0rem',
    shadows: {
      sm: '0 1px 2px 0 rgba(150, 0, 255, 0.3)',
      md: '0 4px 6px -1px rgba(150, 0, 255, 0.4)',
      lg: '0 10px 15px -3px rgba(150, 0, 255, 0.5)',
      xl: '0 20px 25px -5px rgba(150, 0, 255, 0.6)',
      '2xl': '0 25px 50px -12px rgba(150, 0, 255, 0.7)',
    },
  },
  green: {
    id: 'green',
    name: 'Green Neon',
    colors: {
      primary: '142 76% 50%',
      primaryForeground: '210 40% 98%',
      secondary: '142 70% 20%',
      secondaryForeground: '210 40% 98%',
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '217.2 32.6% 17.5%',
      cardForeground: '210 40% 98%',
      popover: '222.2 84% 4.9%',
      popoverForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      accent: '142 60% 25%',
      accentForeground: '210 40% 98%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 40% 98%',
      border: '142 50% 30%',
      input: '142 50% 30%',
      ring: '142 76% 50%',
    },
    typography: {
      fontFamily: {
        sans: '"Inter", system-ui, sans-serif',
        serif: '"Georgia", serif',
        mono: '"Fira Code", monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    borderRadius: '0rem',
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 255, 127, 0.3)',
      md: '0 4px 6px -1px rgba(0, 255, 127, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 255, 127, 0.5)',
      xl: '0 20px 25px -5px rgba(0, 255, 127, 0.6)',
      '2xl': '0 25px 50px -12px rgba(0, 255, 127, 0.7)',
    },
  },
  orange: {
    id: 'orange',
    name: 'Orange Neon',
    colors: {
      primary: '25 100% 55%',
      primaryForeground: '210 40% 98%',
      secondary: '25 80% 20%',
      secondaryForeground: '210 40% 98%',
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '217.2 32.6% 17.5%',
      cardForeground: '210 40% 98%',
      popover: '222.2 84% 4.9%',
      popoverForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      accent: '25 70% 25%',
      accentForeground: '210 40% 98%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 40% 98%',
      border: '25 60% 30%',
      input: '25 60% 30%',
      ring: '25 100% 55%',
    },
    typography: {
      fontFamily: {
        sans: '"Inter", system-ui, sans-serif',
        serif: '"Georgia", serif',
        mono: '"Fira Code", monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    borderRadius: '0rem',
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 165, 0, 0.3)',
      md: '0 4px 6px -1px rgba(255, 165, 0, 0.4)',
      lg: '0 10px 15px -3px rgba(255, 165, 0, 0.5)',
      xl: '0 20px 25px -5px rgba(255, 165, 0, 0.6)',
      '2xl': '0 25px 50px -12px rgba(255, 165, 0, 0.7)',
    },
  },
};

export const defaultTheme: ThemeId = 'light';

// Color Accents (aplicables a cualquier tema base)
export const colorAccents: Record<ColorAccent, { name: string; primary: string; primaryForeground: string }> = {
  default: {
    name: 'Default',
    primary: '221.2 83.2% 53.3%', // Se sobrescribe según tema base
    primaryForeground: '210 40% 98%',
  },
  cyan: {
    name: 'Cyan',
    primary: '187 100% 50%',
    primaryForeground: '222.2 47.4% 11.2%',
  },
  magenta: {
    name: 'Magenta',
    primary: '300 100% 60%',
    primaryForeground: '210 40% 98%',
  },
  purple: {
    name: 'Purple',
    primary: '270 90% 65%',
    primaryForeground: '210 40% 98%',
  },
  green: {
    name: 'Green',
    primary: '142 76% 50%',
    primaryForeground: '210 40% 98%',
  },
  orange: {
    name: 'Orange',
    primary: '25 100% 55%',
    primaryForeground: '210 40% 98%',
  },
  blue: {
    name: 'Blue',
    primary: '217.2 91.2% 59.8%',
    primaryForeground: '222.2 47.4% 11.2%',
  },
};

export function getTheme(themeId: ThemeId): Theme {
  return themes[themeId] || themes[defaultTheme];
}

export function getAllThemes(): Theme[] {
  return Object.values(themes);
}

// Helper para obtener tema base
export function getThemeBase(themeId: ThemeId): ThemeBase {
  if (themeId === 'light') return 'light';
  return 'dark';
}

// Helper para aplicar color accent a un tema
export function applyColorAccent(baseTheme: Theme, accentColor: ColorAccent): Theme {
  if (accentColor === 'default') return baseTheme;
  
  const accent = colorAccents[accentColor];
  if (!accent) return baseTheme;
  
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: accent.primary,
      primaryForeground: accent.primaryForeground,
      ring: accent.primary,
    },
  };
}

