import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../utils/theme';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    const newTheme: Theme = 
      theme === 'light' ? 'dark' : 
      theme === 'dark' ? 'system' : 'light';
    setTheme(newTheme);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-md',
        'text-gray-700 transition-colors hover:bg-gray-100',
        'dark:text-gray-300 dark:hover:bg-gray-800',
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === 'light' && <Sun size={20} />}
      {theme === 'dark' && <Moon size={20} />}
      {theme === 'system' && <Monitor size={20} />}
    </motion.button>
  );
};