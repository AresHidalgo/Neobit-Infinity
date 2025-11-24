import { HTMLAttributes, ReactNode, forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { getRandomRotation } from '../../utils/gamingIcons';

interface MasonryGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MasonryGrid = forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ className, children, cols = 3, gap = 'md', ...props }, ref) => {
    const colsClass = {
      1: 'columns-1',
      2: 'columns-1 md:columns-2',
      3: 'columns-1 md:columns-2 lg:columns-3',
      4: 'columns-1 md:columns-2 lg:columns-4',
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
        className={cn('masonry-grid', colsClass[cols], gapClass[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MasonryGrid.displayName = 'MasonryGrid';

interface AsymmetricGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  ratio?: '30-70' | '40-60' | '60-40' | '70-30' | '50-50';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  reverse?: boolean;
}

export const AsymmetricGrid = forwardRef<HTMLDivElement, AsymmetricGridProps>(
  ({ className, children, ratio = '50-50', gap = 'md', reverse = false, ...props }, ref) => {
    const ratioClass = {
      '30-70': reverse ? 'md:grid-cols-[70%_30%]' : 'md:grid-cols-[30%_70%]',
      '40-60': reverse ? 'md:grid-cols-[60%_40%]' : 'md:grid-cols-[40%_60%]',
      '60-40': reverse ? 'md:grid-cols-[40%_60%]' : 'md:grid-cols-[60%_40%]',
      '70-30': reverse ? 'md:grid-cols-[30%_70%]' : 'md:grid-cols-[70%_30%]',
      '50-50': 'md:grid-cols-2',
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
        className={cn(
          'grid grid-cols-1',
          ratioClass[ratio],
          gapClass[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AsymmetricGrid.displayName = 'AsymmetricGrid';

interface StackedBlocksProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  randomRotation?: boolean;
}

export const StackedBlocks = forwardRef<HTMLDivElement, StackedBlocksProps>(
  ({ className, children, gap = 'md', randomRotation = true, ...props }, ref) => {
    const gapClass = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    };

    const childrenArray = Array.isArray(children) ? children : [children];

    return (
      <div
        ref={ref}
        className={cn('flex flex-col', gapClass[gap], className)}
        {...props}
      >
        {childrenArray.map((child, index) => {
          if (randomRotation) {
            const rotation = getRandomRotation();
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotate: rotation }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {child}
              </motion.div>
            );
          }
          return <div key={index}>{child}</div>;
        })}
      </div>
    );
  }
);

StackedBlocks.displayName = 'StackedBlocks';

interface FloatingBlocksProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  count?: number;
  minSize?: number;
  maxSize?: number;
}

export const FloatingBlocks = forwardRef<HTMLDivElement, FloatingBlocksProps>(
  ({ className, children, count = 5, minSize = 40, maxSize = 120, ...props }, ref) => {
    const blocks = useMemo(() => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        rotation: getRandomRotation(),
      }));
    }, [count, minSize, maxSize]);

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {children}
        {blocks.map((block) => (
          <div
            key={block.id}
            className="absolute pointer-events-none opacity-10"
            style={{
              left: `${block.x}%`,
              top: `${block.y}%`,
              width: `${block.size}px`,
              height: `${block.size}px`,
              transform: `rotate(${block.rotation}deg)`,
            }}
          />
        ))}
      </div>
    );
  }
);

FloatingBlocks.displayName = 'FloatingBlocks';

interface LayoutBlockProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  rowSpan?: 1 | 2 | 3;
  colSpan?: 1 | 2 | 3;
  randomRotation?: boolean;
}

export const LayoutBlock = forwardRef<HTMLDivElement, LayoutBlockProps>(
  ({ 
    className, 
    size = 'medium', 
    rowSpan = 1, 
    colSpan = 1,
    randomRotation = true,
    children,
    ...props 
  }, ref) => {
    const sizeClass = {
      small: 'min-h-[200px]',
      medium: 'min-h-[300px]',
      large: 'min-h-[400px]',
      xlarge: 'min-h-[500px]',
    };

    const rowSpanClass = {
      1: '',
      2: 'md:row-span-2',
      3: 'md:row-span-3',
    };

    const colSpanClass = {
      1: '',
      2: 'md:col-span-2',
      3: 'md:col-span-3',
    };

    const rotation = randomRotation ? getRandomRotation() : 0;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={cn(
          sizeClass[size],
          rowSpanClass[rowSpan],
          colSpanClass[colSpan],
          className
        )}
        style={{
          transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

LayoutBlock.displayName = 'LayoutBlock';

