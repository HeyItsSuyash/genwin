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
    neon: 'bg-neon-volt text-near-black border border-neon-volt hover:bg-near-black hover:text-neon-volt rounded-[4px]',
    dark: 'bg-near-black text-pure-white border border-near-black hover:bg-hover-gray hover:text-opacity-80 rounded-[4px]',
    forest: 'bg-forest-green text-pure-white border border-dark-forest hover:bg-hover-gray hover:text-opacity-80 rounded-[4px]',
    ghost: 'bg-transparent text-pure-white border border-border-olive hover:bg-hover-gray rounded-[4px]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: variant === 'neon' ? 'px-4 py-0 h-10' : variant === 'ghost' ? 'px-8 py-0 h-10' : 'px-4 py-3',
    lg: 'px-6 py-4 text-lg',
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
