import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function Heading1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn('text-4xl lg:text-5xl font-bold tracking-tight', className)}>
      {children}
    </h1>
  );
}

export function Heading2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn('text-3xl lg:text-4xl font-bold tracking-tight', className)}>
      {children}
    </h2>
  );
}

export function Heading3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn('text-2xl lg:text-3xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  );
}

export function Heading4({ children, className }: TypographyProps) {
  return (
    <h4 className={cn('text-xl lg:text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h4>
  );
}

export function Heading5({ children, className }: TypographyProps) {
  return (
    <h5 className={cn('text-lg lg:text-xl font-semibold', className)}>
      {children}
    </h5>
  );
}

export function Heading6({ children, className }: TypographyProps) {
  return (
    <h6 className={cn('text-base lg:text-lg font-semibold', className)}>
      {children}
    </h6>
  );
}

interface TextProps extends TypographyProps {
  size?: 'xs' | 'sm' | 'base' | 'lg';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  muted?: boolean;
}

export function Text({ 
  children, 
  className, 
  size = 'base', 
  weight = 'normal',
  muted = false,
}: TextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <p 
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        muted && 'text-muted-foreground',
        className
      )}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className }: TypographyProps) {
  return (
    <span className={cn('text-xs text-muted-foreground', className)}>
      {children}
    </span>
  );
}

interface LabelProps extends TypographyProps {
  required?: boolean;
  htmlFor?: string;
}

export function Label({ children, className, required, htmlFor }: LabelProps) {
  return (
    <label 
      htmlFor={htmlFor}
      className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  );
}

