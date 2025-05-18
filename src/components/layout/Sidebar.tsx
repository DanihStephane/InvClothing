import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  PackageOpen, 
  ShoppingCart, 
  FileImage, 
  BarChart2, 
  TrendingUp, 
  ShoppingBag,
  Users,
  Shirt,
  Palette,
  Brush,
  Store,
  Settings,
  ChevronRight,
  LogOut,
  Map // Ajout de l'icône Map
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';

type SidebarLink = {
  title: string;
  path: string;
  icon: React.ReactNode;
  submenu?: SidebarLink[];
  minimized?: string;
};

export const Sidebar = ({ 
  collapsed = false,
  onToggle,
  className
}: { 
  collapsed?: boolean;
  onToggle: () => void;
  className?: string;
}) => {
  const { user, logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const links: SidebarLink[] = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard size={20} />,
      minimized: 'Dashboard'
    },
    {
      title: 'Gestion Catalogue',
      path: '#',
      icon: <Shirt size={20} />,
      minimized: 'Catalogue',
      submenu: [
        {
          title: 'Genres',
          path: '/genres',
          icon: <Users size={18} />
        },
        {
          title: 'Classes',
          path: '/classes',
          icon: <PackageOpen size={18} />
        },
        {
          title: 'Matières',
          path: '/materials',
          icon: <Palette size={18} />
        },
        {
          title: 'Motifs',
          path: '/patterns',
          icon: <Brush size={18} />
        },
        {
          title: 'Dessins',
          path: '/designs',
          icon: <FileImage size={18} />
        }
      ]
    },
    {
      title: 'Inventaire',
      path: '/inventory',
      icon: <PackageOpen size={20} />,
      minimized: 'Inventaire'
    },
    {
      title: 'Commandes',
      path: '/orders',
      icon: <ShoppingCart size={20} />,
      minimized: 'Commandes'
    },
    {
      title: 'Images',
      path: '/images',
      icon: <FileImage size={20} />,
      minimized: 'Images'
    },
    {
      title: 'Statistiques',
      path: '/statistics',
      icon: <BarChart2 size={20} />,
      minimized: 'Stats'
    },
    {
      title: 'Mouvements',
      path: '/movements',
      icon: <TrendingUp size={20} />,
      minimized: 'Mouvements'
    },
    {
      title: 'Ventes',
      path: '/sales',
      icon: <ShoppingBag size={20} />,
      minimized: 'Ventes'
    },
    {
      title: 'Magasins',
      path: '/stores',
      icon: <Store size={20} />,
      minimized: 'Magasins'
    },
    // Nouveau menu pour la localisation des appareils
    {
      title: 'Localiser Appareils',
      path: '/device-tracking',
      icon: <Map size={20} />,
      minimized: 'Localiser'
    },
    {
      title: 'Paramètres',
      path: '/settings',
      icon: <Settings size={20} />,
      minimized: 'Paramètres'
    }
  ];

  const toggleSubmenu = (title: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <aside 
      className={cn(
        'flex h-screen flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900',
        collapsed ? 'w-20' : 'w-64',
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          {!collapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ml-2 text-xl font-semibold text-gray-900 dark:text-white"
            >
              InvClothing
            </motion.span>
          )}
        </div>
        <button 
          onClick={onToggle}
          className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ChevronRight 
            size={collapsed ? 18 : 20} 
            className={cn(
              'transition-transform duration-300',
              collapsed ? 'rotate-180' : ''
            )} 
          />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {links.map((link) => (
          <div key={link.title}>
            {link.submenu ? (
              <div>
                <button
                  onClick={() => toggleSubmenu(link.title)}
                  className={cn(
                    'group flex w-full items-center rounded-md p-2',
                    'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                    'transition-colors duration-200',
                    expandedMenus[link.title] && 'bg-gray-100 dark:bg-gray-800'
                  )}
                >
                  <span className="mr-3 text-gray-500 dark:text-gray-400">{link.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">{link.title}</span>
                      <ChevronRight
                        size={16}
                        className={cn(
                          'text-gray-500 transition-transform dark:text-gray-400',
                          expandedMenus[link.title] ? 'rotate-90' : ''
                        )}
                      />
                    </>
                  )}
                </button>
                
                <AnimatePresence>
                  {(expandedMenus[link.title] || collapsed) && link.submenu && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        collapsed 
                          ? 'absolute left-full ml-2 top-0 z-50 min-w-48 rounded-md border border-gray-200 bg-white p-2 shadow-md dark:border-gray-800 dark:bg-gray-900' 
                          : 'ml-6 mt-1 space-y-1'
                      )}
                      style={{ 
                        display: collapsed && !expandedMenus[link.title] ? 'none' : undefined 
                      }}
                    >
                      {link.submenu.map((sublink) => (
                        <NavLink
                          key={sublink.title}
                          to={sublink.path}
                          className={({ isActive }) => cn(
                            'flex items-center rounded-md p-2',
                            'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                            'transition-colors duration-200',
                            isActive && 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                          )}
                        >
                          <span className="mr-3 text-gray-500 dark:text-gray-400">{sublink.icon}</span>
                          <span className="text-sm font-medium">{sublink.title}</span>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                to={link.path}
                className={({ isActive }) => cn(
                  'flex items-center rounded-md p-2',
                  'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                  'transition-colors duration-200',
                  isActive && 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                )}
              >
                <span className="mr-3 text-gray-500 dark:text-gray-400">{link.icon}</span>
                {!collapsed ? (
                  <span className="text-sm font-medium">{link.title}</span>
                ) : (
                  <span className="sr-only">{link.minimized}</span>
                )}
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <div className={cn(
          'flex items-center',
          collapsed ? 'justify-center' : 'justify-between'
        )}>
          {!collapsed && (
            <div className="flex items-center">
              <Avatar
                src={user?.avatar}
                alt={user?.name || 'User'}
                size="sm"
              />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            title="Déconnexion"
          >
            <LogOut size={collapsed ? 20 : 18} />
          </button>
        </div>
      </div>
    </aside>
  );
};
