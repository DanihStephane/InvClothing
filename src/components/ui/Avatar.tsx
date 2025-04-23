import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  className,
  size = 'md',
}: AvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div 
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-600 dark:text-gray-300">
          {getInitials(alt)}
        </div>
      )}
    </div>
  );
};