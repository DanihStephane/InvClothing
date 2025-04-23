import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

interface InventoryProgressProps {
  totalItems: number;
  catalogedItems: number;
  percentComplete: number;
  className?: string;
}

export const InventoryProgress = ({
  totalItems,
  catalogedItems,
  percentComplete,
  className,
}: InventoryProgressProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>État de l'inventaire</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progression
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {catalogedItems} / {totalItems} articles
            </span>
          </div>
          <ProgressBar 
            value={percentComplete} 
            variant={percentComplete < 30 ? 'error' : percentComplete < 70 ? 'warning' : 'success'} 
            size="md"
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-primary-50 p-3 text-center dark:bg-primary-900/20">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">À cataloguer</p>
            <p className="text-xl font-bold text-primary-700 dark:text-primary-400">
              {totalItems - catalogedItems}
            </p>
          </div>
          <div className="rounded-lg bg-success-50 p-3 text-center dark:bg-success-900/20">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Catalogués</p>
            <p className="text-xl font-bold text-success-700 dark:text-success-400">
              {catalogedItems}
            </p>
          </div>
          <div className="rounded-lg bg-accent-50 p-3 text-center dark:bg-accent-900/20">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
            <p className="text-xl font-bold text-accent-700 dark:text-accent-400">
              {totalItems}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};