import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: string;
  position: { x: number; y: number }; // Position relative sur l'image (en pourcentage)
}

const DeviceTracking: React.FC = () => {
  // Données simulées des appareils
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Appareil Mobile #1',
      type: 'Scanner',
      status: 'active',
      lastUpdate: '2023-10-15T10:30:00',
      position: { x: 50, y: 40 } // Centre d'Antananarivo
    },
    {
      id: '2',
      name: 'Appareil Mobile #2',
      type: 'Tablette',
      status: 'active',
      lastUpdate: '2023-10-15T11:15:00',
      position: { x: 51, y: 38 } // Quartier d'Analakely
    },
    {
      id: '3',
      name: 'Appareil Mobile #3',
      type: 'Scanner',
      status: 'maintenance',
      lastUpdate: '2023-10-15T09:45:00',
      position: { x: 52, y: 39 } // Quartier d'Ivandry
    },
    {
      id: '4',
      name: 'Appareil Mobile #4',
      type: 'Tablette',
      status: 'inactive',
      lastUpdate: '2023-10-14T16:20:00',
      position: { x: 49, y: 41 } // Quartier d'Ankorondrano
    },
    {
      id: '5',
      name: 'Appareil Mobile #5',
      type: 'Scanner',
      status: 'active',
      lastUpdate: '2023-10-15T12:10:00',
      position: { x: 48, y: 42 } // Quartier d'Andravoahangy
    }
  ]);

  // État pour gérer le clignotement des points
  const [blink, setBlink] = useState(false);

  // Effet pour faire clignoter les points
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  // Fonction pour obtenir la couleur du point en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // État pour suivre l'appareil sélectionné
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Localisation des Appareils en Déplacement</h1>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Carte des Appareils</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[600px] w-full rounded-md overflow-hidden border border-gray-200">
                {/* Image statique de Madagascar */}
                <img 
                  src="/madagascar-map.jpg" 
                  alt="Carte de Madagascar" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback si l'image n'est pas trouvée
                    e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Madagascar_%28orthographic_projection%29.svg/1200px-Madagascar_%28orthographic_projection%29.svg.png";
                  }}
                />
                
                {/* Points représentant les appareils */}
                {devices.map(device => (
                  <div 
                    key={device.id}
                    className={`absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                      ${getStatusColor(device.status)} 
                      ${blink && device.status === 'active' ? 'animate-pulse' : ''}
                      ${selectedDevice === device.id ? 'ring-2 ring-white ring-offset-2' : ''}
                    `}
                    style={{ 
                      left: `${device.position.x}%`, 
                      top: `${device.position.y}%`,
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
                    }}
                    onClick={() => setSelectedDevice(device.id === selectedDevice ? null : device.id)}
                  />
                ))}
                
                {/* Infobulle pour l'appareil sélectionné */}
                {selectedDevice && devices.find(d => d.id === selectedDevice) && (
                  <div 
                    className="absolute bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg z-10"
                    style={{ 
                      left: `${devices.find(d => d.id === selectedDevice)!.position.x}%`, 
                      top: `${devices.find(d => d.id === selectedDevice)!.position.y + 5}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <h3 className="font-semibold">{devices.find(d => d.id === selectedDevice)!.name}</h3>
                    <p className="text-sm">Type: {devices.find(d => d.id === selectedDevice)!.type}</p>
                    <p className="text-sm">
                      Statut: {devices.find(d => d.id === selectedDevice)!.status}
                    </p>
                    <p className="text-xs text-gray-500">
                      Dernière mise à jour: {formatDate(devices.find(d => d.id === selectedDevice)!.lastUpdate)}
                    </p>
                  </div>
                )}
                
                {/* Légende */}
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md">
                  <h4 className="text-sm font-semibold mb-1">Légende</h4>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                    <span>Actif</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span>En maintenance</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="inline-block w-3 h-3 rounded-full bg-gray-500"></span>
                    <span>Inactif</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Cliquez sur un point pour voir les détails de l'appareil. Les points verts clignotants représentent les appareils actifs.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Liste des Appareils</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[550px] overflow-y-auto">
                {devices.map(device => (
                  <div 
                    key={device.id}
                    className={`rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer
                      ${selectedDevice === device.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''}
                    `}
                    onClick={() => setSelectedDevice(device.id === selectedDevice ? null : device.id)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{device.name}</h3>
                      <span className={`inline-block h-2 w-2 rounded-full ${
                        device.status === 'active' ? 'bg-green-500' : 
                        device.status === 'inactive' ? 'bg-gray-500' : 'bg-yellow-500'
                      } ${blink && device.status === 'active' ? 'animate-pulse' : ''}`}></span>
                    </div>
                    <p className="text-sm text-gray-500">Type: {device.type}</p>
                    <p className="text-sm text-gray-500">
                      Statut: {device.status}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Mise à jour: {formatDate(device.lastUpdate)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Appareils actifs:</span>
                  <span className="font-semibold">{devices.filter(d => d.status === 'active').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">En maintenance:</span>
                  <span className="font-semibold">{devices.filter(d => d.status === 'maintenance').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Inactifs:</span>
                  <span className="font-semibold">{devices.filter(d => d.status === 'inactive').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total:</span>
                  <span className="font-semibold">{devices.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeviceTracking;

