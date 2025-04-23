import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, Filter, CheckCircle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { formatCurrency } from '../../utils/format';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  expectedQuantity: number;
  price: number;
  category: string;
  status: 'pending' | 'verified' | 'discrepancy';
}

const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'T-shirt Coton Bio Homme',
    sku: 'TSH-CB-H-001',
    quantity: 45,
    expectedQuantity: 50,
    price: 29.99,
    category: 'T-shirts',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Robe d\'été Femme',
    sku: 'ROB-ETE-F-001',
    quantity: 30,
    expectedQuantity: 30,
    price: 59.99,
    category: 'Robes',
    status: 'verified'
  },
  // Add more mock items...
];

const InventoryPage = () => {
  const [items, setItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'T-shirts', 'Robes', 'Pantalons', 'Chemises'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'discrepancy':
        return 'error';
      default:
        return 'warning';
    }
  };

  const handleVerify = (id: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const status = item.quantity === item.expectedQuantity ? 'verified' : 'discrepancy';
        return { ...item, status };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Inventaire</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Vérifiez et validez le stock des articles
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

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  'flex flex-col rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between',
                  'dark:border-gray-800',
                  item.status === 'verified' && 'bg-success-50/50 dark:bg-success-900/20'
                )}
              >
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status === 'verified' ? 'Vérifié' : 
                       item.status === 'discrepancy' ? 'Écart' : 'En attente'}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">SKU: {item.sku}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <span>Prix: {formatCurrency(item.price)}</span>
                    <span>Quantité attendue: {item.expectedQuantity}</span>
                    <span className={cn(
                      'font-medium',
                      item.quantity !== item.expectedQuantity && 'text-error-600 dark:text-error-400'
                    )}>
                      Quantité réelle: {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant={item.status === 'verified' ? 'success' : 'primary'}
                    leftIcon={<CheckCircle size={16} />}
                    onClick={() => handleVerify(item.id)}
                    disabled={item.status === 'verified'}
                  >
                    {item.status === 'verified' ? 'Vérifié' : 'Vérifier'}
                  </Button>
                </div>
              </motion.div>
            ))}

            {filteredItems.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Aucun article trouvé
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;