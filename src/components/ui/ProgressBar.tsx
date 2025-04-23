import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const ProgressBar = ({
  value,
  max = 100,
  className,
  variant = 'primary',
  size = 'md',
  showValue = false,
  valuePrefix = '',
  valueSuffix = '%',
}: ProgressBarProps) => {
  const percentage = Math.round((value / max) * 100);

  const variantClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    accent: 'bg-accent-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      <div className={cn('flex justify-between', showValue ? 'mb-1' : '')}>
        {showValue && (
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {valuePrefix}{percentage}{valueSuffix}
            </span>
          </div>
        )}
      </div>
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
          sizeClasses[size],
          className
        )}
      >
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            sizeClasses[size],
            variantClasses[variant]
          )}
        />
      </div>
    </div>
  );
};