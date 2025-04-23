import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';

interface HeaderProps {
  toggleSidebar: () => void;
  className?: string;
}

export const Header = ({ toggleSidebar, className }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <header 
      className={cn(
        'flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900',
        className
      )}
    >
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        
        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher..."
            className="h-10 w-72 rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm 
            focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
            dark:border-gray-700 dark:bg-gray-800 dark:focus:border-primary-400 dark:focus:ring-primary-400"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-error-500" />
        </button>
        
        <ThemeToggle />
        
        <div className="flex items-center">
          <Avatar
            src={user?.avatar}
            alt={user?.name || 'User'}
            size="sm"
          />
          <span className="ml-2 hidden text-sm font-medium text-gray-900 dark:text-white md:block">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
};