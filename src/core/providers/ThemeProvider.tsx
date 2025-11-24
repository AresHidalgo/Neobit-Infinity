import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeId, getTheme, themes, Theme, ThemeBase, ColorAccent, getThemeBase, applyColorAccent, colorAccents } from '@/config/theme.config';

type SystemTheme = 'system';

export type ThemePreference = ThemeId | SystemTheme;

interface ThemeContextType {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  currentTheme: Theme;
  resolvedThemeId: ThemeId;
  availableThemes: Theme[];
  themeBase: ThemeBase;
  colorAccent: ColorAccent;
  setColorAccent: (accent: ColorAccent) => void;
  availableAccents: ColorAccent[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemePreference;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme: defaultThemeProp = 'system',
  storageKey = 'neobit-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemePreference>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as ThemePreference;
      if (stored && (stored === 'system' || themes[stored as ThemeId])) {
        return stored;
      }
    }
    return defaultThemeProp;
  });

  const [colorAccent, setColorAccentState] = useState<ColorAccent>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${storageKey}-accent`) as ColorAccent;
      if (stored && colorAccents[stored]) {
        return stored;
      }
    }
    return 'default';
  });

  const getResolvedThemeId = (pref: ThemePreference): ThemeId => {
    if (pref === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light';
    }
    return pref;
  };

  const [resolvedThemeId, setResolvedThemeId] = useState<ThemeId>(() => 
    getResolvedThemeId(theme)
  );

  const themeBase: ThemeBase = getThemeBase(resolvedThemeId);
  
  // Aplicar color accent al tema base
  const baseTheme = getTheme(resolvedThemeId);
  const currentTheme = applyColorAccent(baseTheme, colorAccent);
  
  const availableAccents: ColorAccent[] = Object.keys(colorAccents) as ColorAccent[];

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'ocean', 'forest', 'sunset', 'cyan', 'magenta', 'purple', 'green', 'orange');

    let effectiveThemeId: ThemeId;

    if (theme === 'system') {
      effectiveThemeId = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        effectiveThemeId = e.matches ? 'dark' : 'light';
        setResolvedThemeId(effectiveThemeId);
        applyThemeToDOM(effectiveThemeId, colorAccent);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      applyThemeToDOM(effectiveThemeId, colorAccent);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      effectiveThemeId = theme;
    }

    setResolvedThemeId(effectiveThemeId);
    applyThemeToDOM(effectiveThemeId, colorAccent);
  }, [theme, colorAccent]);

  const applyThemeToDOM = (themeId: ThemeId, accent: ColorAccent = 'default') => {
    const root = window.document.documentElement;
    const baseTheme = getTheme(themeId);
    const finalTheme = applyColorAccent(baseTheme, accent);
    
    // Apply theme class
    root.classList.add(themeId);
    
    // Apply CSS variables with accent color
    Object.entries(finalTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
    
    // Apply typography
    root.style.setProperty('--font-sans', finalTheme.typography.fontFamily.sans);
    root.style.setProperty('--font-serif', finalTheme.typography.fontFamily.serif);
    root.style.setProperty('--font-mono', finalTheme.typography.fontFamily.mono);
    
    // Apply spacing
    root.style.setProperty('--radius', finalTheme.borderRadius);
  };

  const value: ThemeContextType = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
    currentTheme,
    resolvedThemeId,
    availableThemes: Object.values(themes),
    themeBase,
    colorAccent,
    setColorAccent: (accent) => {
      localStorage.setItem(`${storageKey}-accent`, accent);
      setColorAccentState(accent);
    },
    availableAccents,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeConfig() {
  const { currentTheme, resolvedThemeId } = useTheme();
  return { theme: currentTheme, themeId: resolvedThemeId };
}
