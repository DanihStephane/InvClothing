import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Layers, Plus, Save, Trash2 } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

type MenuItem = {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
};

const MenuSettings = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Dashboard', enabled: true, description: 'Vue d\'ensemble et statistiques' },
    { id: '2', name: 'Inventaire', enabled: true, description: 'Gestion des articles et stock' },
    { id: '3', name: 'Commandes', enabled: true, description: 'Suivi des commandes et livraisons' },
    { id: '4', name: 'Images', enabled: true, description: 'Gestion des images des produits' },
    { id: '5', name: 'Statistiques', enabled: true, description: 'Analyse des ventes et tendances' },
    { id: '6', name: 'Mouvements', enabled: true, description: 'Suivi des entrées et sorties' },
    { id: '7', name: 'Vente', enabled: true, description: 'Module de caisse et ventes' },
  ]);

  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    enabled: true,
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleToggle = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
  };

  const handleDelete = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleAddItem = () => {
    if (newMenuItem.name?.trim()) {
      const id = Date.now().toString();
      setMenuItems([...menuItems, { 
        id, 
        name: newMenuItem.name, 
        description: newMenuItem.description || '',
        enabled: newMenuItem.enabled || true 
      }]);
      setNewMenuItem({ name: '', description: '', enabled: true });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Paramètres des Menus</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Configurez les menus qui apparaissent dans l'application
      </p>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Menus de l'Application</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={() => setIsAdding(!isAdding)}
          >
            Ajouter un menu
          </Button>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-700"
              >
                <h3 className="mb-3 text-sm font-medium">Nouveau Menu</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="menu-name" className="mb-1 block text-sm font-medium">
                      Nom du menu
                    </label>
                    <input
                      id="menu-name"
                      type="text"
                      value={newMenuItem.name}
                      onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                      className="input"
                      placeholder="Entrez le nom du menu"
                    />
                  </div>
                  <div>
                    <label htmlFor="menu-description" className="mb-1 block text-sm font-medium">
                      Description
                    </label>
                    <input
                      id="menu-description"
                      type="text"
                      value={newMenuItem.description}
                      onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                      className="input"
                      placeholder="Entrez une description"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAdding(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAddItem}
                      disabled={!newMenuItem.name?.trim()}
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={cn(
                  'flex items-center justify-between rounded-lg border border-gray-200 p-4',
                  'transition-colors dark:border-gray-800',
                  item.enabled ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
                )}
              >
                <div className="flex items-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    <Layers size={20} />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="font-medium">{item.name}</h3>
                      {!item.enabled && (
                        <Badge variant="outline" className="ml-2">
                          Désactivé
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={item.enabled}
                        onChange={() => handleToggle(item.id)}
                      />
                      <div className={cn(
                        "peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px]",
                        "after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all",
                        "peer-checked:bg-primary-600 peer-checked:after:translate-x-full",
                        "peer-focus:ring-4 peer-focus:ring-primary-200 dark:bg-gray-700",
                        "dark:peer-focus:ring-primary-800"
                      )} />
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-error-500 hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-900/20"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button leftIcon={<Save size={18} />}>
              Enregistrer les modifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuSettings;