import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, Filter, Image, Eye, Download, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ProductImage {
  id: string;
  url: string;
  name: string;
  productName: string;
  category: string;
  uploadDate: string;
}

const mockImages: ProductImage[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg',
    name: 'tshirt-homme-blanc-001.jpg',
    productName: 'T-shirt Coton Bio Homme',
    category: 'T-shirts',
    uploadDate: '2024-03-15'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    name: 'robe-ete-femme-001.jpg',
    productName: 'Robe d\'été Femme',
    category: 'Robes',
    uploadDate: '2024-03-14'
  },
  // Add more mock images...
];

const ImagesPage = () => {
  const [images, setImages] = useState<ProductImage[]>(mockImages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'T-shirts', 'Robes', 'Pantalons', 'Chemises'];

  const filteredImages = images.filter(image => {
    const matchesSearch = 
      image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Images des Articles</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gérez les images de vos articles
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
          <Button
            leftIcon={<Image size={16} />}
          >
            Ajouter
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
          <CardTitle>Galerie d'images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredImages.map(image => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.productName}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="text-sm font-medium text-white">{image.productName}</h3>
                    <p className="mt-1 text-xs text-gray-300">{image.name}</p>
                  </div>
                </div>
                <div className="absolute right-2 top-2 flex space-x-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Button
                    variant="primary"
                    size="sm"
                    className="h-8 w-8 p-0"
                    title="Voir"
                  >
                    <Eye size={14} />
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="h-8 w-8 p-0"
                    title="Télécharger"
                  >
                    <Download size={14} />
                  </Button>
                  <Button
                    variant="error"
                    size="sm"
                    className="h-8 w-8 p-0"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Aucune image trouvée
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImagesPage;