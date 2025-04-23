import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { formatCurrency } from '../../utils/format';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'card' | 'cash';
  date: string;
  status: 'completed' | 'refunded';
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'T-shirt Coton Bio Homme',
    sku: 'TSH-CB-H-001',
    price: 29.99,
    category: 'T-shirts',
    stock: 45,
    image: 'https://via.placeholder.com/100'
  },
  {
    id: '2',
    name: 'Robe d\'été Femme',
    sku: 'ROB-ETE-F-001',
    price: 59.99,
    category: 'Robes',
    stock: 30,
    image: 'https://via.placeholder.com/100'
  },
  {
    id: '3',
    name: 'Pantalon Chino Homme',
    sku: 'PAN-CH-H-003',
    price: 49.99,
    category: 'Pantalons',
    stock: 25,
    image: 'https://via.placeholder.com/100'
  },
  {
    id: '4',
    name: 'Chemise Lin Homme',
    sku: 'CHE-LIN-H-002',
    price: 45.99,
    category: 'Chemises',
    stock: 20,
    image: 'https://via.placeholder.com/100'
  }
];

const mockRecentSales: Sale[] = [
  {
    id: 'S001',
    items: [
      { ...mockProducts[0], quantity: 2 },
      { ...mockProducts[2], quantity: 1 }
    ],
    total: 109.97,
    paymentMethod: 'card',
    date: '2023-10-15 14:30',
    status: 'completed'
  },
  {
    id: 'S002',
    items: [
      { ...mockProducts[1], quantity: 1 }
    ],
    total: 59.99,
    paymentMethod: 'cash',
    date: '2023-10-15 13:45',
    status: 'completed'
  }
];

const SalesPage = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [recentSales] = useState<Sale[]>(mockRecentSales);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'T-shirts', 'Robes', 'Pantalons', 'Chemises'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = (paymentMethod: 'card' | 'cash') => {
    if (cart.length === 0) return;
    
    const newSale: Sale = {
      id: `S${(recentSales.length + 1).toString().padStart(3, '0')}`,
      items: [...cart],
      total: calculateTotal(),
      paymentMethod,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'completed'
    };
    
    // In a real app, you would send this to your backend
    console.log('New sale:', newSale);
    
    // Clear cart
    setCart([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Caisse de Vente</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gérez les ventes et les transactions
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input"
            />
          </div>
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Products List */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Produits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                  >
                    <div className="mb-3 flex justify-center">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-24 w-24 rounded-md object-cover"
                        />
                      )}
                    </div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">SKU: {product.sku}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold">{formatCurrency(product.price)}</span>
                      <Badge variant={product.stock > 10 ? 'success' : 'warning'}>
                        Stock: {product.stock}
                      </Badge>
                    </div>
                    <Button
                      variant="primary"
                      className="mt-3"
                      leftIcon={<Plus size={16} />}
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      Ajouter
                    </Button>
                  </motion.div>
                ))}

                {filteredProducts.length === 0 && (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Aucun produit trouvé
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shopping Cart */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Panier
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Le panier est vide
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex w-full items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold">{formatCurrency(calculateTotal())}</span>
              </div>
              <div className="flex w-full space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  leftIcon={<Banknote size={16} />}
                  onClick={() => handleCheckout('cash')}
                  disabled={cart.length === 0}
                >
                  Espèces
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  leftIcon={<CreditCard size={16} />}
                  onClick={() => handleCheckout('card')}
                  disabled={cart.length === 0}
                >
                  Carte
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Recent Sales */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Ventes récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map(sale => (
                  <div 
                    key={sale.id}
                    className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Vente #{sale.id}</h4>
                      <Badge variant={sale.status === 'completed' ? 'success' : 'error'}>
                        {sale.status === 'completed' ? 'Complétée' : 'Remboursée'}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {sale.date} | {formatCurrency(sale.total)} | 
                      {sale.paymentMethod === 'card' ? 'Carte' : 'Espèces'}
                    </p>
                    <div className="mt-2 text-sm">
                      <p>{sale.items.length} article(s)</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;