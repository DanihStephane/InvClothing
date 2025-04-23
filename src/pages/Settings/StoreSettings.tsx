import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Store, Building, Plus, Edit2, Trash2, MapPin, Phone, Mail } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Store as StoreType, Menu } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

// Mock store data
const mockStores: StoreType[] = [
  {
    id: '1',
    name: 'Magasin Central',
    address: '123 Rue Principale, Paris, 75001',
    phone: '+33 1 23 45 67 89',
    email: 'central@example.com',
    enabledMenus: ['dashboard', 'inventory', 'orders', 'statistics', 'sales']
  },
  {
    id: '2',
    name: 'Boutique Rivoli',
    address: '45 Rue de Rivoli, Paris, 75004',
    phone: '+33 1 98 76 54 32',
    email: 'rivoli@example.com',
    enabledMenus: ['dashboard', 'inventory', 'sales']
  }
];

const StoreSettings = () => {
  const [stores, setStores] = useState<StoreType[]>(mockStores);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteStore = (id: string) => {
    setStores(stores.filter(store => store.id !== id));
  };

  const handleEditStore = (store: StoreType) => {
    setSelectedStore(store);
    setIsEditing(true);
  };

  const menuOptions: { id: Menu; label: string }[] = [
    { id: 'dashboard', label: 'Tableau de bord' },
    { id: 'inventory', label: 'Inventaire' },
    { id: 'orders', label: 'Commandes' },
    { id: 'images', label: 'Images' },
    { id: 'statistics', label: 'Statistiques' },
    { id: 'movements', label: 'Mouvements' },
    { id: 'sales', label: 'Ventes' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Magasins</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Configurez vos magasins et leurs paramètres
      </p>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Magasins</CardTitle>
          <Button 
            leftIcon={<Plus size={18} />}
            onClick={() => {
              setSelectedStore({
                id: '',
                name: '',
                address: '',
                phone: '',
                email: '',
                enabledMenus: ['dashboard']
              });
              setIsEditing(true);
            }}
          >
            Ajouter un magasin
          </Button>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {isEditing && selectedStore && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
              >
                <h3 className="mb-4 text-lg font-medium">
                  {selectedStore.id ? 'Modifier le magasin' : 'Nouveau magasin'}
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Nom</label>
                    <input
                      type="text"
                      value={selectedStore.name}
                      onChange={(e) => setSelectedStore({...selectedStore, name: e.target.value})}
                      className="input"
                      placeholder="Nom du magasin"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      value={selectedStore.email}
                      onChange={(e) => setSelectedStore({...selectedStore, email: e.target.value})}
                      className="input"
                      placeholder="Email du magasin"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Téléphone</label>
                    <input
                      type="tel"
                      value={selectedStore.phone}
                      onChange={(e) => setSelectedStore({...selectedStore, phone: e.target.value})}
                      className="input"
                      placeholder="Téléphone du magasin"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium">Adresse</label>
                    <input
                      type="text"
                      value={selectedStore.address}
                      onChange={(e) => setSelectedStore({...selectedStore, address: e.target.value})}
                      className="input"
                      placeholder="Adresse complète"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium">Menus activés</h4>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                    {menuOptions.map(menu => (
                      <label
                        key={menu.id}
                        className={cn(
                          "flex cursor-pointer items-center space-x-2 rounded-md border border-gray-200",
                          "p-2 dark:border-gray-800",
                          selectedStore.enabledMenus.includes(menu.id) ? 
                            "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400" : 
                            "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        )}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedStore.enabledMenus.includes(menu.id)}
                          onChange={() => {
                            const enabledMenus = selectedStore.enabledMenus.includes(menu.id)
                              ? selectedStore.enabledMenus.filter(m => m !== menu.id)
                              : [...selectedStore.enabledMenus, menu.id];
                            setSelectedStore({...selectedStore, enabledMenus});
                          }}
                        />
                        <span>{menu.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedStore(null);
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedStore.id) {
                        setStores(stores.map(store => 
                          store.id === selectedStore.id ? selectedStore : store
                        ));
                      } else {
                        setStores([...stores, {...selectedStore, id: Date.now().toString()}]);
                      }
                      setIsEditing(false);
                      setSelectedStore(null);
                    }}
                    disabled={!selectedStore.name}
                  >
                    {selectedStore.id ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {stores.map(store => (
              <motion.div
                key={store.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 rounded-md bg-primary-50 p-2 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                      <Store size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{store.name}</h3>
                      <div className="mt-1 flex flex-col space-y-1 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" /> {store.address}
                        </div>
                        <div className="flex items-center">
                          <Phone size={14} className="mr-1" /> {store.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail size={14} className="mr-1" /> {store.email}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                          Menus activés:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {store.enabledMenus.map(menu => (
                            <Badge key={menu} variant="secondary" className="capitalize">
                              {menuOptions.find(m => m.id === menu)?.label || menu}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-accent-500 hover:bg-accent-50 hover:text-accent-600 dark:hover:bg-accent-900/20"
                      onClick={() => handleEditStore(store)}
                    >
                      <Edit2 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-error-500 hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-900/20"
                      onClick={() => handleDeleteStore(store.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreSettings;