import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card = ({ 
  children, 
  className, 
  hoverable = false
}: CardProps) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-5',
        'shadow-card transition-all dark:border-gray-800 dark:bg-gray-800',
        hoverable && 'hover:shadow-card-hover',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn('mb-4 flex flex-col space-y-1.5', className)}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <h3 className={cn('text-lg font-semibold', className)}>
      {children}
    </h3>
  );
};

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription = ({ children, className }: CardDescriptionProps) => {
  return (
    <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)}>
      {children}
    </p>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn('pt-0', className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={cn('flex items-center pt-4', className)}>
      {children}
    </div>
  );
};