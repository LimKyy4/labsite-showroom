import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'sage';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium tracking-tight transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

    const variants = {
      primary: 'bg-forest text-white hover:bg-forest-light active:bg-forest-dark border border-forest',
      secondary: 'bg-alabaster text-charcoal hover:bg-gray-100 border border-hairline',
      outline: 'bg-transparent text-charcoal hover:bg-alabaster border border-hairline hover:border-gray-300',
      ghost: 'bg-transparent text-charcoal hover:bg-alabaster border border-transparent',
      sage: 'bg-sage-light text-forest hover:bg-[#DEE8E2] border border-sage-border',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 h-8 gap-1.5',
      md: 'text-sm px-4 py-2.5 h-10 gap-2',
      lg: 'text-sm font-semibold px-6 py-3.5 h-12 gap-2.5',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
