import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlighted';
  elevated?: boolean;
}

export function Card({ 
  variant = 'default', 
  elevated = false, 
  className = '', 
  children, 
  ...props 
}: CardProps) {
  
  const baseStyles = 'bg-transparent sm:bg-near-black border rounded-[8px]';
  
  const borderStyles = variant === 'highlighted' 
    ? 'border-neon-volt' 
    : 'border-charcoal/80';
    
  const shadowStyles = elevated
    ? 'shadow-level-2'
    : 'shadow-level-1';

  return (
    <div 
      className={`${baseStyles} ${borderStyles} ${shadowStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pb-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
