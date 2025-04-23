import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ActivityLog } from '../../types';
import { formatDateTime } from '../../utils/format';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

interface RecentActivityProps {
  activities: ActivityLog[];
  className?: string;
}

export const RecentActivity = ({ activities, className }: RecentActivityProps) => {
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
      case 'logout':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Activités récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Aucune activité récente
            </p>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <Avatar
                  size="sm"
                  alt={activity.userName}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.userName}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDateTime(activity.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getActionBadgeVariant(activity.action)}>
                      {activity.action}
                    </Badge>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {activity.details}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {activities.length > 0 && (
          <div className="mt-4 flex justify-center">
            <button
              className={cn(
                'text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300',
                'transition-colors'
              )}
            >
              Voir toutes les activités
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};