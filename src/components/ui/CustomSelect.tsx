import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
}

export const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className,
  isDisabled = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full',
        className
      )}
    >
      <div
        onClick={toggleDropdown}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          'dark:border-gray-700 dark:bg-gray-900',
          isDisabled && 'cursor-not-allowed opacity-50',
          !isDisabled && 'cursor-pointer'
        )}
      >
        <span className={cn(
          'block truncate',
          !selectedOption && 'text-gray-400'
        )}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform text-gray-500',
            isOpen && 'rotate-180'
          )}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: a1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200',
              'bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800'
            )}
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={cn(
                  'flex cursor-pointer items-center px-3 py-2 text-sm',
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  option.value === value && 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                )}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};