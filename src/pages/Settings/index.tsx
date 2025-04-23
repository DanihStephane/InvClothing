import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Sliders, Users, Store, Activity, Menu, Grid, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

type SettingCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
};

const Settings = () => {
  const settings: SettingCard[] = [
    {
      id: 'menu',
      title: 'Paramètres des Menus',
      description: 'Configurez les menus qui apparaissent dans l\'application',
      icon: <Menu size={24} />,
      path: '/settings/menus',
      color: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
    },
    {
      id: 'roles',
      title: 'Rôles et Permissions',
      description: 'Gérez les rôles et leurs permissions associées',
      icon: <Users size={24} />,
      path: '/settings/roles',
      color: 'bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400',
    },
    {
      id: 'stores',
      title: 'Gestion des Magasins',
      description: 'Configurez vos magasins et leurs paramètres',
      icon: <Store size={24} />,
      path: '/settings/stores',
      color: 'bg-secondary-50 text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-400',
    },
    {
      id: 'activity',
      title: 'Activité des Utilisateurs',
      description: 'Consultez l\'historique des actions des utilisateurs',
      icon: <Activity size={24} />,
      path: '/settings/activity',
      color: 'bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400',
    },
    {
      id: 'system',
      title: 'Paramètres Système',
      description: 'Configurez les paramètres généraux du système',
      icon: <Sliders size={24} />,
      path: '/settings/system',
      color: 'bg-warning-50 text-warning-600 dark:bg-warning-900/20 dark:text-warning-400',
    },
    {
      id: 'appearance',
      title: 'Apparence',
      description: 'Personnalisez l\'apparence de l\'application',
      icon: <Grid size={24} />,
      path: '/settings/appearance',
      color: 'bg-error-50 text-error-600 dark:bg-error-900/20 dark:text-error-400',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Paramètres</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Configurez votre application selon vos besoins
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {settings.map((setting, index) => (
          <motion.div
            key={setting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full transition-all duration-200 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex h-full flex-col">
                  <div className="mb-4 flex items-center space-x-4">
                    <div className={cn('rounded-md p-3', setting.color)}>
                      {setting.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{setting.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      as="a"
                      href={setting.path}
                      rightIcon={<ChevronRight size={16} />}
                    >
                      Configurer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;