import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import { ClothingGenre } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

// Mock data for demonstration
const mockGenres: ClothingGenre[] = [
  { id: '1', name: 'Hommes', description: 'Vêtements pour hommes adultes' },
  { id: '2', name: 'Femmes', description: 'Vêtements pour femmes adultes' },
  { id: '3', name: 'Garçons', description: 'Vêtements pour garçons (enfants)' },
  { id: '4', name: 'Filles', description: 'Vêtements pour filles (enfants)' },
];

const GenreManagement = () => {
  const [genres, setGenres] = useState<ClothingGenre[]>(mockGenres);
  const [selectedGenre, setSelectedGenre] = useState<ClothingGenre | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditGenre = (genre: ClothingGenre) => {
    setSelectedGenre(genre);
    setIsEditing(true);
  };

  const handleDeleteGenre = (id: string) => {
    setGenres(genres.filter(genre => genre.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Genres</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gérez les différentes catégories de genres pour vos vêtements
          </p>
        </div>
        <Button 
          onClick={() => {
            setSelectedGenre({ id: '', name: '', description: '' });
            setIsEditing(true);
          }}
          leftIcon={<Plus size={16} />}
        >
          Ajouter un genre
        </Button>
      </div>

      <AnimatePresence>
        {isEditing && selectedGenre && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card>
              <CardHeader>
                <CardTitle>{selectedGenre.id ? 'Modifier' : 'Ajouter'} un genre</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="genre-name" className="mb-1 block text-sm font-medium">
                      Nom
                    </label>
                    <input
                      id="genre-name"
                      type="text"
                      value={selectedGenre.name}
                      onChange={(e) => setSelectedGenre({...selectedGenre, name: e.target.value})}
                      className="input"
                      placeholder="Nom du genre"
                    />
                  </div>
                  <div>
                    <label htmlFor="genre-description" className="mb-1 block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      id="genre-description"
                      value={selectedGenre.description}
                      onChange={(e) => setSelectedGenre({...selectedGenre, description: e.target.value})}
                      className="input min-h-[100px]"
                      placeholder="Description du genre"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedGenre(null);
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={() => {
                        if (selectedGenre.id) {
                          setGenres(genres.map(genre => 
                            genre.id === selectedGenre.id ? selectedGenre : genre
                          ));
                        } else {
                          setGenres([...genres, {...selectedGenre, id: Date.now().toString()}]);
                        }
                        setIsEditing(false);
                        setSelectedGenre(null);
                      }}
                      disabled={!selectedGenre.name}
                    >
                      {selectedGenre.id ? 'Mettre à jour' : 'Ajouter'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <CardHeader>
          <CardTitle>Liste des genres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {genres.map(genre => (
              <motion.div
                key={genre.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={cn(
                  'flex flex-col rounded-lg border border-gray-200 p-4',
                  'dark:border-gray-800'
                )}
              >
                <div className="mb-3 flex items-center space-x-3">
                  <div className="rounded-full bg-primary-50 p-2 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                    <Users size={18} />
                  </div>
                  <h3 className="text-lg font-medium">{genre.name}</h3>
                </div>
                <p className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                  {genre.description || 'Aucune description'}
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent-500 hover:bg-accent-50 hover:text-accent-600 dark:hover:bg-accent-900/20"
                    onClick={() => handleEditGenre(genre)}
                  >
                    <Edit2 size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-error-500 hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-900/20"
                    onClick={() => handleDeleteGenre(genre.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {genres.length === 0 && (
            <div className="py-12 text-center">
              <Users size={48} className="mx-auto text-gray-300 dark:text-gray-700" />
              <h3 className="mt-4 text-lg font-medium">Aucun genre disponible</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Commencez par ajouter votre premier genre
              </p>
              <Button 
                className="mt-4"
                onClick={() => {
                  setSelectedGenre({ id: '', name: '', description: '' });
                  setIsEditing(true);
                }}
                leftIcon={<Plus size={16} />}
              >
                Ajouter un genre
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GenreManagement;