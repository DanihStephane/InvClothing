import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar, TrendingUp, DollarSign, Package, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/format';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  items: number;
}

const mockSalesData: SalesData[] = [
  { date: '2024-03-01', revenue: 12500, orders: 45, items: 120 },
  { date: '2024-03-02', revenue: 15000, orders: 52, items: 145 },
  { date: '2024-03-03', revenue: 13200, orders: 48, items: 130 },
  { date: '2024-03-04', revenue: 16800, orders: 58, items: 160 },
  { date: '2024-03-05', revenue: 14500, orders: 50, items: 140 },
  { date: '2024-03-06', revenue: 18000, orders: 62, items: 180 },
  { date: '2024-03-07', revenue: 16000, orders: 55, items: 150 },
];

const StatisticsPage = () => {
  const [dateRange, setDateRange] = useState('week');

  const totalRevenue = mockSalesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = mockSalesData.reduce((sum, day) => sum + day.orders, 0);
  const totalItems = mockSalesData.reduce((sum, day) => sum + day.items, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Statistiques</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Analysez vos performances de vente
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={dateRange === 'week' ? 'primary' : 'outline'}
            onClick={() => setDateRange('week')}
          >
            Semaine
          </Button>
          <Button
            variant={dateRange === 'month' ? 'primary' : 'outline'}
            onClick={() => setDateRange('month')}
          >
            Mois
          </Button>
          <Button
            variant={dateRange === 'year' ? 'primary' : 'outline'}
            onClick={() => setDateRange('year')}
          >
            Année
          </Button>
          <Button
            variant="outline"
            leftIcon={<Calendar size={16} />}
          >
            Personnalisé
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Chiffre d'affaires
                </p>
                <h3 className="mt-1 text-2xl font-bold">{formatCurrency(totalRevenue)}</h3>
              </div>
              <div className="rounded-full bg-primary-50 p-3 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                <DollarSign size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-success-500" />
              <span className="font-medium text-success-500">+12.5%</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">vs période précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Commandes
                </p>
                <h3 className="mt-1 text-2xl font-bold">{totalOrders}</h3>
              </div>
              <div className="rounded-full bg-accent-50 p-3 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400">
                <Package size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-success-500" />
              <span className="font-medium text-success-500">+8.2%</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">vs période précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Articles vendus
                </p>
                <h3 className="mt-1 text-2xl font-bold">{totalItems}</h3>
              </div>
              <div className="rounded-full bg-secondary-50 p-3 text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-400">
                <Users size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-success-500" />
              <span className="font-medium text-success-500">+15.3%</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">vs période précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Panier moyen
                </p>
                <h3 className="mt-1 text-2xl font-bold">{formatCurrency(averageOrderValue)}</h3>
              </div>
              <div className="rounded-full bg-success-50 p-3 text-success-600 dark:bg-success-900/20 dark:text-success-400">
                <TrendingUp size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-success-500" />
              <span className="font-medium text-success-500">+5.7%</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">vs période précédente</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Évolution du chiffre d'affaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Chiffre d'affaires"
                    stroke="#4f46e5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ventes par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" name="Commandes" fill="#0d9488" />
                  <Bar dataKey="items" name="Articles" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;