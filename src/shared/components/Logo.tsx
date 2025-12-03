import { Link } from "react-router-dom";
import { routesConfig, logoConfig } from "@/config/app.config";
import { motion } from "framer-motion";
import logotypeSvg from "@/assets/logos/logotype.svg";

interface LogoProps {
  className?: string;
  variant?: "default" | "compact";
  showText?: boolean;
}

export function Logo({
  className = "",
  variant = "default",
  showText = true,
}: LogoProps) {
  const logoContent = (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon/Symbol */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-10 h-10 md:w-12 md:h-12">
          <img
            src={logotypeSvg}
            alt={logoConfig.image.alt}
            className="w-full h-full object-contain dark:invert"
          />
        </div>
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-xl md:text-2xl font-heading uppercase tracking-tight leading-none text-foreground font-bold">
            {logoConfig.text.primary}
          </span>
          <span className="text-xs md:text-sm font-mono text-muted-foreground tracking-wider uppercase leading-none">
            {logoConfig.text.secondary}
          </span>
        </motion.div>
      )}
    </div>
  );

  if (variant === "compact") {
    return (
      <Link
        to={routesConfig.home}
        className="inline-block transition-opacity hover:opacity-80"
      >
        {logoContent}
      </Link>
    );
  }

  return (
    <Link
      to={routesConfig.home}
      className="inline-block transition-opacity hover:opacity-80"
    >
      {logoContent}
    </Link>
  );
}
