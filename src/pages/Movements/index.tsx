import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, CheckCircle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { formatCurrency } from '../../utils/format';

interface MovementItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: string;
  type: 'received' | 'given';
  status: 'pending' | 'completed';
  date: string;
  store: string;
}

const mockMovementItems: MovementItem[] = [
  {
    id: '1',
    name: 'T-shirt Coton Bio Homme',
    sku: 'TSH-CB-H-001',
    quantity: 5,
    price: 29.99,
    category: 'T-shirts',
    type: 'received',
    status: 'pending',
    date: '2023-10-15',
    store: 'Magasin Central'
  },
  {
    id: '2',
    name: 'Robe d\'été Femme',
    sku: 'ROB-ETE-F-001',
    quantity: 3,
    price: 59.99,
    category: 'Robes',
    type: 'given',
    status: 'completed',
    date: '2023-10-12',
    store: 'Boutique Rivoli'
  },
  {
    id: '3',
    name: 'Pantalon Chino Homme',
    sku: 'PAN-CH-H-003',
    quantity: 8,
    price: 49.99,
    category: 'Pantalons',
    type: 'received',
    status: 'completed',
    date: '2023-10-10',
    store: 'Entrepôt Nord'
  },
  {
    id: '4',
    name: 'Chemise Lin Homme',
    sku: 'CHE-LIN-H-002',
    quantity: 4,
    price: 45.99,
    category: 'Chemises',
    type: 'given',
    status: 'pending',
    date: '2023-10-14',
    store: 'Boutique Marais'
  }
];

const MovementsPage = () => {
  const [movements, setMovements] = useState<MovementItem[]>(mockMovementItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'received' | 'given'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.store.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || movement.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || movement.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCompleteMovement = (id: string) => {
    setMovements(movements.map(movement => {
      if (movement.id === id) {
        return { ...movement, status: 'completed' };
      }
      return movement;
    }));
  };

  const getTypeIcon = (type: MovementItem['type']) => {
    return type === 'received' ? 
      <ArrowDownLeft className="h-4 w-4 text-success-500" /> : 
      <ArrowUpRight className="h-4 w-4 text-warning-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Mouvements de Stock</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gérez les surplus reçus et donnés entre les magasins
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

      <div className="flex flex-wrap gap-2">
        <div className="space-x-2">
          <Button
            variant={selectedType === 'all' ? 'primary' : 'outline'}
            onClick={() => setSelectedType('all')}
          >
            Tous les types
          </Button>
          <Button
            variant={selectedType === 'received' ? 'primary' : 'outline'}
            onClick={() => setSelectedType('received')}
            leftIcon={<ArrowDownLeft size={16} />}
          >
            Surplus reçus
          </Button>
          <Button
            variant={selectedType === 'given' ? 'primary' : 'outline'}
            onClick={() => setSelectedType('given')}
            leftIcon={<ArrowUpRight size={16} />}
          >
            Surplus donnés
          </Button>
        </div>
        <div className="space-x-2">
          <Button
            variant={selectedStatus === 'all' ? 'secondary' : 'outline'}
            onClick={() => setSelectedStatus('all')}
          >
            Tous les statuts
          </Button>
          <Button
            variant={selectedStatus === 'pending' ? 'secondary' : 'outline'}
            onClick={() => setSelectedStatus('pending')}
          >
            En attente
          </Button>
          <Button
            variant={selectedStatus === 'completed' ? 'secondary' : 'outline'}
            onClick={() => setSelectedStatus('completed')}
          >
            Complétés
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des mouvements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMovements.map(movement => (
              <motion.div
                key={movement.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  'flex flex-col rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between',
                  'dark:border-gray-800',
                  movement.status === 'completed' && 'bg-success-50/50 dark:bg-success-900/20'
                )}
              >
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {getTypeIcon(movement.type)}
                      <h3 className="ml-2 font-medium">{movement.name}</h3>
                    </div>
                    <Badge variant={movement.type === 'received' ? 'success' : 'warning'}>
                      {movement.type === 'received' ? 'Reçu' : 'Donné'}
                    </Badge>
                    <Badge variant={movement.status === 'completed' ? 'success' : 'warning'}>
                      {movement.status === 'completed' ? 'Complété' : 'En attente'}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    SKU: {movement.sku} | Magasin: {movement.store} | Date: {movement.date}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <span>Prix unitaire: {formatCurrency(movement.price)}</span>
                    <span className="font-medium">
                      Quantité: {movement.quantity} unités
                    </span>
                    <span className="font-medium">
                      Total: {formatCurrency(movement.price * movement.quantity)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end">
                  {movement.status === 'pending' && (
                    <Button
                      variant="primary"
                      leftIcon={<CheckCircle size={16} />}
                      onClick={() => handleCompleteMovement(movement.id)}
                    >
                      Valider
                    </Button>
                  )}
                  {movement.status === 'completed' && (
                    <Button
                      variant="success"
                      disabled
                      leftIcon={<CheckCircle size={16} />}
                    >
                      Validé
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}

            {filteredMovements.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Aucun mouvement trouvé
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementsPage;