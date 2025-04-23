import React from 'react';
import { cn } from '../../utils/cn';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { ProgressBar } from './ProgressBar';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  progress?: number;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  progress,
  className,
  color = 'primary',
}: StatCardProps) => {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
    secondary: 'bg-secondary-50 text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-400',
    accent: 'bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400',
    success: 'bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400',
    warning: 'bg-warning-50 text-warning-600 dark:bg-warning-900/20 dark:text-warning-400',
    error: 'bg-error-50 text-error-600 dark:bg-error-900/20 dark:text-error-400',
  };

  const progressColor = {
    primary: 'primary',
    secondary: 'secondary',
    accent: 'accent',
    success: 'success',
    warning: 'warning',
    error: 'error',
  }[color] as 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </CardTitle>
        <div className={cn('rounded-full p-2', colorMap[color])}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold"
          >
            {value}
          </motion.div>
          
          {trend !== undefined && (
            <div className="mt-1 flex items-center">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend > 0 ? 'text-success-600' : 'text-error-600',
                  trend === 0 && 'text-gray-500'
                )}
              >
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">vs last period</span>
            </div>
          )}
          
          {progress !== undefined && (
            <div className="mt-4">
              <ProgressBar 
                value={progress} 
                variant={progressColor} 
                size="sm" 
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};