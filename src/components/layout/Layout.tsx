import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '../../utils/cn';

export const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
        className="hidden lg:block"
      />
      
      <div className={cn(
        'flex flex-1 flex-col overflow-hidden',
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      )}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-auto bg-gray-50 p-4 dark:bg-gray-900 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};