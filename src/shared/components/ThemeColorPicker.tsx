import { useTheme } from '@/core/providers/ThemeProvider';
import { ColorAccent, colorAccents } from '@/config/theme.config';
import { Button } from './ui/Button';
import { Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/DropdownMenu';
import { Check } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { motion } from 'framer-motion';

export function ThemeColorPicker() {
  const { colorAccent, setColorAccent, themeBase } = useTheme();

  const handleAccentSelect = (accent: ColorAccent) => {
    setColorAccent(accent);
  };

  // Filtrar accents disponibles (excluir 'default' si es necesario)
  const availableAccents: ColorAccent[] = (Object.keys(colorAccents) as ColorAccent[]).filter(
    (acc) => acc !== 'default' || themeBase === 'light'
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" title="Color Accent">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Select color accent</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Color Accent
        </div>
        <DropdownMenuSeparator />
        {(Object.keys(colorAccents) as ColorAccent[]).map((accent) => {
          const accentConfig = colorAccents[accent];
          const isActive = colorAccent === accent;
          
          return (
            <DropdownMenuItem
              key={accent}
              onClick={() => handleAccentSelect(accent)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className={cn(
                    'h-5 w-5 rounded-full border-2 border-foreground/30 brutal-border-minimal',
                    'flex items-center justify-center transition-all duration-200',
                    isActive && 'border-primary neon-glow'
                  )}
                  style={{
                    backgroundColor: `hsl(${accentConfig.primary})`,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isActive && (
                    <motion.div
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: `hsl(${accentConfig.primaryForeground})`,
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
                <span className="capitalize font-bold uppercase tracking-wide text-sm">
                  {accentConfig.name}
                </span>
              </div>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Check className="h-4 w-4 text-primary" />
                </motion.div>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

