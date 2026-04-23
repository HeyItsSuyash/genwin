import React from 'react';

type ButtonVariant = 'neon' | 'dark' | 'forest' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'dark', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  
  const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pure-black focus:ring-neon-volt disabled:opacity-50 disabled:cursor-not-allowed shadow-none active:shadow-inset-pressed active:text-pale-yellow';
  
  const variants = {
    neon: 'bg-neon-volt text-near-black border border-neon-volt hover:bg-pure-black hover:text-neon-volt rounded-[4px] uppercase tracking-[1.4px]',
    dark: 'bg-near-black text-pure-white border border-charcoal/80 hover:bg-hover-gray rounded-[4px] uppercase tracking-[1.4px]',
    forest: 'bg-forest-green text-pure-white border border-near-black hover:bg-hover-gray rounded-[4px] uppercase tracking-[1.4px]',
    ghost: 'bg-transparent text-pure-white border border-border-olive hover:bg-near-black hover:text-neon-volt rounded-[4px] uppercase tracking-[1.4px]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[11.2px] font-bold',
    md: 'px-4 py-3 text-sm font-bold',
    lg: 'px-8 py-4 text-base font-bold',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
