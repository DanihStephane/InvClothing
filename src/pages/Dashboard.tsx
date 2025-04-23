import React from 'react';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { InventoryProgress } from '../components/dashboard/InventoryProgress';
import { CategoryDistribution } from '../components/dashboard/CategoryDistribution';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ActivityLog } from '../types';

// Mock data for demonstration
const mockStats = {
  totalItems: 1256,
  lowStock: 48,
  catalogComplete: 78,
  newItems: 124,
};

const mockTrends = {
  totalItemsTrend: 12,
  lowStockTrend: -8,
  catalogCompleteTrend: 5,
  newItemsTrend: 24,
};

const mockCategoryData = [
  { name: 'Hommes', value: 420, color: '#4338ca' },
  { name: 'Femmes', value: 520, color: '#0d9488' },
  { name: 'Garçons', value: 180, color: '#f59e0b' },
  { name: 'Filles', value: 136, color: '#ef4444' },
];

const mockActivities: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Admin User',
    action: 'Add',
    details: 'A ajouté 24 nouveaux articles dans la catégorie "T-shirts"',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: '2',
    userId: '2',
    userName: 'Claire Martin',
    action: 'Update',
    details: 'A mis à jour les quantités du stock pour 15 articles',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '3',
    userId: '3',
    userName: 'Thomas Petit',
    action: 'Create',
    details: 'A créé une nouvelle catégorie "Vestes d\'été"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: '4',
    userId: '4',
    userName: 'Sophie Renard',
    action: 'Login',
    details: 'S\'est connectée depuis Magasin Central',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tableau de Bord</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Vue d'ensemble de votre inventaire et activités récentes
        </p>
      </div>

      <StatsOverview stats={mockStats} trends={mockTrends} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InventoryProgress
          totalItems={1500}
          catalogedItems={1135}
          percentComplete={76}
        />
        <CategoryDistribution data={mockCategoryData} />
      </div>

      <RecentActivity activities={mockActivities} />
    </div>
  );
};

export default Dashboard;