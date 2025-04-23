import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { formatDateTime } from '../../utils/format';
import { CustomSelect } from '../../components/ui/CustomSelect';
import { ActivityLog } from '../../types';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

// Mock activity data
const mockActivities: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Admin User',
    action: 'Update',
    details: 'A modifié les paramètres du magasin "Magasin Central"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '2',
    userId: '2',
    userName: 'Claire Martin',
    action: 'Create',
    details: 'A créé un nouvel article "T-shirt Homme Coton Bio"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '3',
    userId: '3',
    userName: 'Thomas Petit',
    action: 'Delete',
    details: 'A supprimé l\'article "Chemise Femme Lin Bleu"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '4',
    userId: '2',
    userName: 'Claire Martin',
    action: 'Login',
    details: 'S\'est connectée au système depuis l\'adresse IP 192.168.1.34',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: '5',
    userId: '4',
    userName: 'Sophie Renard',
    action: 'Create',
    details: 'A ajouté un nouveau magasin "Boutique Rivoli"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '6',
    userId: '1',
    userName: 'Admin User',
    action: 'Update',
    details: 'A modifié les permissions du rôle "Manager"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
  },
  {
    id: '7',
    userId: '3',
    userName: 'Thomas Petit',
    action: 'Logout',
    details: 'S\'est déconnecté du système',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  }
];

const UserActivity = () => {
  const [activities, setActivities] = useState<ActivityLog[]>(mockActivities);
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'Toutes les actions' },
    { value: 'create', label: 'Créations' },
    { value: 'update', label: 'Modifications' },
    { value: 'delete', label: 'Suppressions' },
    { value: 'login', label: 'Connexions' },
    { value: 'logout', label: 'Déconnexions' },
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => 
        activity.action.toLowerCase() === filter.toLowerCase()
      );

  const getActionBadgeVariant = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
      case 'add':
        return 'success';
      case 'update':
      case 'edit':
        return 'accent';
      case 'delete':
      case 'remove':
        return 'error';
      case 'login':
        return 'secondary';
      case 'logout':
        return 'primary';
      default:
        return 'primary';
    }
  };

  // Group activities by date (today, yesterday, earlier this week, earlier)
  const groupedActivities: Record<string, ActivityLog[]> = {
    'Aujourd\'hui': [],
    'Hier': [],
    'Cette semaine': [],
    'Plus ancien': [],
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  filteredActivities.forEach(activity => {
    const activityDate = new Date(activity.timestamp);
    if (activityDate >= today) {
      groupedActivities['Aujourd\'hui'].push(activity);
    } else if (activityDate >= yesterday) {
      groupedActivities['Hier'].push(activity);
    } else if (activityDate >= oneWeekAgo) {
      groupedActivities['Cette semaine'].push(activity);
    } else {
      groupedActivities['Plus ancien'].push(activity);
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Activité des Utilisateurs</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Suivez les actions réalisées par les utilisateurs dans le système
      </p>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle>Journal d'activité</CardTitle>
            <div className="w-full sm:w-64">
              <CustomSelect
                options={filterOptions}
                value={filter}
                onChange={setFilter}
                placeholder="Filtrer par type d'action"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-h-[600px] overflow-y-auto">
          {Object.entries(groupedActivities).map(([dateGroup, groupActivities]) => {
            if (groupActivities.length === 0) return null;
            
            return (
              <div key={dateGroup} className="mb-6">
                <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {dateGroup}
                </h3>
                <div className="space-y-4">
                  {groupActivities.map(activity => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={cn(
                        'flex space-x-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800',
                        'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      )}
                    >
                      <Avatar
                        size="md"
                        alt={activity.userName}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{activity.userName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDateTime(activity.timestamp)}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center space-x-2">
                          <Badge variant={getActionBadgeVariant(activity.action)}>
                            {activity.action}
                          </Badge>
                          <div className="text-gray-700 dark:text-gray-300">
                            {activity.details}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredActivities.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Aucune activité trouvée pour ce filtre
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserActivity;