import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Package, TrendingUp, Search, Filter } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { formatCurrency } from '../../utils/format';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  type: 'stock' | 'surplus';
  status: 'pending' | 'approved' | 'completed';
  store: string;
  items: OrderItem[];
  total: number;
  date: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    type: 'stock',
    status: 'pending',
    store: 'Magasin Central',
    items: [
      { id: '1', name: 'T-shirt Coton Bio Homme', quantity: 50, price: 29.99 },
      { id: '2', name: 'Robe d\'été Femme', quantity: 30, price: 59.99 }
    ],
    total: 3299.70,
    date: new Date().toISOString()
  },
  // Add more mock orders...
];

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState<'stock' | 'surplus'>('stock');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => 
    order.type === activeTab &&
    (order.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'approved':
        return 'accent';
      default:
        return 'warning';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Commandes</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gérez les commandes de stock et les surplus
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input"
            />
          </div>
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            Filtres
          </Button>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          variant={activeTab === 'stock' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('stock')}
          leftIcon={<Package size={18} />}
        >
          Commandes de stock
        </Button>
        <Button
          variant={activeTab === 'surplus' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('surplus')}
          leftIcon={<TrendingUp size={18} />}
        >
          Surplus
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === 'stock' ? 'Liste des commandes' : 'Liste des surplus'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{order.store}</h3>
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Commande #{order.id}
                    </p>
                    <div className="mt-4 space-y-2">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span>{item.name}</span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {item.quantity} × {formatCurrency(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-lg font-medium">
                      {formatCurrency(order.total)}
                    </div>
                    <Button variant="outline" size="sm">
                      Voir les détails
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredOrders.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Aucune commande trouvée
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;