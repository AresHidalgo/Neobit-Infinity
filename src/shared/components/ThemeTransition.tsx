import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/core/providers/ThemeProvider";

export function ThemeTransition() {
  const { resolvedThemeId } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevTheme, setPrevTheme] = useState(resolvedThemeId);

  useEffect(() => {
    if (resolvedThemeId !== prevTheme) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevTheme(resolvedThemeId);
      }, 400); // Duración de la transición (300-500ms como especificado)

      return () => clearTimeout(timer);
    }
  }, [resolvedThemeId, prevTheme]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay de transición con color del nuevo tema */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `hsl(var(--background))`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Efecto de fade/crossfade */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, 
                hsl(var(--primary) / 0.1) 0%,
                transparent 50%,
                hsl(var(--primary) / 0.1) 100%
              )`,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
