import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Lock, Shield, Users, Plus, Save } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Permission, UserRole } from '../../types';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

// Mock data for permissions
const mockPermissions: Permission[] = [
  {
    id: "1",
    name: "inventory.view",
    description: "Voir l'inventaire",
    roles: ["admin", "manager", "staff"]
  },
  {
    id: "2",
    name: "inventory.create",
    description: "Créer des articles d'inventaire",
    roles: ["admin", "manager"]
  },
  {
    id: "3",
    name: "inventory.update",
    description: "Modifier des articles d'inventaire",
    roles: ["admin", "manager"]
  },
  {
    id: "4",
    name: "inventory.delete",
    description: "Supprimer des articles d'inventaire",
    roles: ["admin"]
  },
  {
    id: "5",
    name: "users.manage",
    description: "Gérer les utilisateurs",
    roles: ["admin"]
  },
  {
    id: "6",
    name: "reports.view",
    description: "Voir les rapports",
    roles: ["admin", "manager"]
  },
  {
    id: "7",
    name: "settings.edit",
    description: "Modifier les paramètres",
    roles: ["admin"]
  }
];

const RolePermissions = () => {
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [activeTab, setActiveTab] = useState<UserRole>("admin");

  const handleTogglePermission = (permissionId: string) => {
    setPermissions(permissions.map(permission => {
      if (permission.id === permissionId) {
        const roles = [...permission.roles];
        if (roles.includes(activeTab)) {
          return {
            ...permission,
            roles: roles.filter(role => role !== activeTab)
          };
        } else {
          return {
            ...permission,
            roles: [...roles, activeTab]
          };
        }
      }
      return permission;
    }));
  };

  const getRoleCount = (role: UserRole) => {
    return permissions.filter(permission => permission.roles.includes(role)).length;
  };

  const roleColorMap: Record<UserRole, string> = {
    admin: "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400",
    manager: "bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400",
    staff: "bg-secondary-50 text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-400"
  };

  const roleIconMap: Record<UserRole, React.ReactNode> = {
    admin: <Shield size={16} />,
    manager: <Lock size={16} />,
    staff: <Users size={16} />
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Rôles et Permissions</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Configurez les permissions pour chaque rôle d'utilisateur
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Gestion des Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex space-x-2">
            {(["admin", "manager", "staff"] as UserRole[]).map(role => (
              <motion.button
                key={role}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(role)}
                className={cn(
                  "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium",
                  activeTab === role 
                    ? roleColorMap[role]
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                )}
              >
                <span>{roleIconMap[role]}</span>
                <span className="capitalize">{role}</span>
                <Badge variant={activeTab === role ? "primary" : "outline"} className="ml-1">
                  {getRoleCount(role)}
                </Badge>
              </motion.button>
            ))}
          </div>

          <div className="space-y-3">
            {permissions.map(permission => (
              <motion.div
                key={permission.id}
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800"
              >
                <div>
                  <h3 className="font-medium">{permission.description}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{permission.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={permission.roles.includes(activeTab)}
                      onChange={() => handleTogglePermission(permission.id)}
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
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              leftIcon={<Plus size={18} />}
            >
              Ajouter une permission
            </Button>
            <Button leftIcon={<Save size={18} />}>
              Enregistrer les modifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolePermissions;