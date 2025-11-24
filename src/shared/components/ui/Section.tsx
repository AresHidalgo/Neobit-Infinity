import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

// Helper types to exclude conflicting animation handlers when using with motion components
type MotionSectionProps = Omit<HTMLAttributes<HTMLElement>, keyof HTMLMotionProps<'section'> | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> & Partial<HTMLMotionProps<'section'>>;
type MotionDivProps = Omit<HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<'div'> | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> & Partial<HTMLMotionProps<'div'>>;

interface SectionProps extends MotionSectionProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'accent' | 'highlight';
  withNeon?: boolean;
  children: ReactNode;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, title, subtitle, variant = 'default', withNeon = true, children, ...props }, ref) => {
    const variantStyles = {
      default: 'border-foreground/20 bg-card',
      accent: 'border-primary bg-card',
      highlight: 'border-primary bg-primary/5',
    };

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className={cn(
          'brutal-section brutal-section-hover',
          variantStyles[variant],
          withNeon && 'neon-border-hover',
          className
        )}
        {...props}
      >
        {title && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, ease: "easeOut" }}
            className="mb-8 pb-6 border-b-[4px] border-foreground/20"
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base lg:text-lg font-normal text-muted-foreground tracking-wide">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.section>
    );
  }
);

Section.displayName = 'Section';

interface SectionGridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SectionGrid = forwardRef<HTMLDivElement, SectionGridProps>(
  ({ className, cols = 3, gap = 'lg', children, ...props }, ref) => {
    const colsClass = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    const gapClass = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    };

    return (
      <div
        ref={ref}
        className={cn('grid', colsClass[cols], gapClass[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SectionGrid.displayName = 'SectionGrid';

interface SectionItemProps extends MotionDivProps {
  children?: ReactNode;
  hover?: boolean;
}

export const SectionItem = forwardRef<HTMLDivElement, SectionItemProps>(
  ({ className, hover = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={hover ? {
          scale: 1.05,
          y: -8,
          transition: { duration: 0.3 }
        } : undefined}
        className={cn(
          'brutal-card border-[4px] p-8 transition-all duration-300 ease-out',
          hover && 'brutal-card-hover cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

SectionItem.displayName = 'SectionItem';

