import React from 'react';
import { StatCard } from '../ui/StatCard';
import { PackageOpen, AlertTriangle, FileCheck, TrendingUp } from 'lucide-react';

interface StatsOverviewProps {
  stats: {
    totalItems: number;
    lowStock: number;
    catalogComplete: number;
    newItems: number;
  };
  trends: {
    totalItemsTrend: number;
    lowStockTrend: number;
    catalogCompleteTrend: number;
    newItemsTrend: number;
  };
}

export const StatsOverview = ({ stats, trends }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Articles totaux"
        value={stats.totalItems}
        icon={<PackageOpen size={18} />}
        trend={trends.totalItemsTrend}
        color="primary"
      />
      
      <StatCard
        title="Stock faible"
        value={stats.lowStock}
        icon={<AlertTriangle size={18} />}
        trend={trends.lowStockTrend}
        color="warning"
      />
      
      <StatCard
        title="Catalogue complété"
        value={`${stats.catalogComplete}%`}
        icon={<FileCheck size={18} />}
        trend={trends.catalogCompleteTrend}
        progress={stats.catalogComplete}
        color="success"
      />
      
      <StatCard
        title="Nouveaux articles"
        value={stats.newItems}
        icon={<TrendingUp size={18} />}
        trend={trends.newItemsTrend}
        color="accent"
      />
    </div>
  );
};