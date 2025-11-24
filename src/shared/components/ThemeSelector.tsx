import { useState } from 'react';
import { useTheme } from '@/core/providers/ThemeProvider';
import { ThemeId, getThemeBase } from '@/config/theme.config';
import { Button } from './ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/shared/components/ui/DropdownMenu';
import { Moon, Sun, Monitor, Check } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { ThemeColorPicker } from './ThemeColorPicker';

export function ThemeSelector() {
  const { theme, setTheme, availableThemes, resolvedThemeId, themeBase } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeId: ThemeId | 'system') => {
    setTheme(themeId);
    setIsOpen(false);
  };

  // Separar temas por base (light/dark)
  const lightThemes = availableThemes.filter((t) => getThemeBase(t.id) === 'light');
  const darkThemes = availableThemes.filter((t) => getThemeBase(t.id) === 'dark');

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative" title="Theme Base">
            {theme === 'system' ? (
              <Monitor className="h-5 w-5" />
            ) : themeBase === 'dark' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Select theme base</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="font-bold uppercase tracking-wide">
            Theme Base
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleThemeSelect('system')}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Monitor className="h-4 w-4" />
              <span className="font-bold uppercase tracking-wide text-sm">System</span>
            </div>
            {theme === 'system' && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="font-bold uppercase tracking-wide text-xs text-muted-foreground">
            Light Themes
          </DropdownMenuLabel>
          {lightThemes.map((themeOption) => {
            const isActive = resolvedThemeId === themeOption.id && theme !== 'system';
            return (
              <DropdownMenuItem
                key={themeOption.id}
                onClick={() => handleThemeSelect(themeOption.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <span className="font-bold uppercase tracking-wide text-sm">{themeOption.name}</span>
                </div>
                {isActive && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="font-bold uppercase tracking-wide text-xs text-muted-foreground">
            Dark Themes
          </DropdownMenuLabel>
          {darkThemes.map((themeOption) => {
            const isActive = resolvedThemeId === themeOption.id && theme !== 'system';
            return (
              <DropdownMenuItem
                key={themeOption.id}
                onClick={() => handleThemeSelect(themeOption.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Moon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-bold uppercase tracking-wide text-sm">{themeOption.name}</span>
                </div>
                {isActive && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <ThemeColorPicker />
    </div>
  );
}

