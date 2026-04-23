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
  
  const baseStyles = 'bg-transparent sm:bg-near-black border rounded-lg';
  
  const borderStyles = variant === 'highlighted' 
    ? 'border-neon-volt' 
    : 'border-charcoal/80';
    
  const shadowStyles = elevated
    ? 'shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
    : 'shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]';

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
