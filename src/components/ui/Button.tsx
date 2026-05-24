import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-heading uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            'bg-red-600 text-white hover:bg-red-700': variant === 'primary',
            'bg-stone-200 text-stone-950 hover:bg-stone-300': variant === 'secondary',
            'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white': variant === 'outline',
            'hover:bg-red-50 text-stone-950 hover:text-red-600': variant === 'ghost',
            'bg-stone-950 text-white hover:bg-stone-800': variant === 'danger',
            'h-9 px-4 text-sm': size === 'sm',
            'h-12 px-8 text-base tracking-widest': size === 'md',
            'h-14 px-10 text-lg tracking-widest': size === 'lg',
            'w-full': fullWidth
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
