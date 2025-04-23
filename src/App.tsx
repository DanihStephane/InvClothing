import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { initTheme } from './utils/theme';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import GenreManagement from './pages/Catalog/GenreManagement';
import Settings from './pages/Settings';
import MenuSettings from './pages/Settings/MenuSettings';
import RolePermissions from './pages/Settings/RolePermissions';
import StoreSettings from './pages/Settings/StoreSettings';
import UserActivity from './pages/Settings/UserActivity';
import InventoryPage from './pages/Inventory';
import OrdersPage from './pages/Orders';
import ImagesPage from './pages/Images';
import StatisticsPage from './pages/Statistics';
import MovementsPage from './pages/Movements';
import SalesPage from './pages/Sales';

// Initialize theme
initTheme();

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route 
                index 
                element={
                  <PageTransition>
                    <Dashboard />
                  </PageTransition>
                } 
              />
              
              {/* Catalog Management Routes */}
              <Route 
                path="genres" 
                element={
                  <PageTransition>
                    <GenreManagement />
                  </PageTransition>
                } 
              />
              
              {/* Inventory Routes */}
              <Route 
                path="inventory" 
                element={
                  <PageTransition>
                    <InventoryPage />
                  </PageTransition>
                } 
              />
              
              {/* Orders Routes */}
              <Route 
                path="orders" 
                element={
                  <PageTransition>
                    <OrdersPage />
                  </PageTransition>
                } 
              />

              {/* Images Routes */}
              <Route 
                path="images" 
                element={
                  <PageTransition>
                    <ImagesPage />
                  </PageTransition>
                } 
              />

              {/* Statistics Routes */}
              <Route 
                path="statistics" 
                element={
                  <PageTransition>
                    <StatisticsPage />
                  </PageTransition>
                } 
              />

              {/* Movements Routes */}
              <Route 
                path="movements" 
                element={
                  <PageTransition>
                    <MovementsPage />
                  </PageTransition>
                } 
              />

              {/* Sales Routes */}
              <Route 
                path="sales" 
                element={
                  <PageTransition>
                    <SalesPage />
                  </PageTransition>
                } 
              />
              
              {/* Stores Route - Direct access */}
              <Route 
                path="stores" 
                element={
                  <PageTransition>
                    <StoreSettings />
                  </PageTransition>
                } 
              />
              
              {/* Settings Routes */}
              <Route 
                path="settings" 
                element={
                  <PageTransition>
                    <Settings />
                  </PageTransition>
                } 
              />
              <Route 
                path="settings/menus" 
                element={
                  <PageTransition>
                    <MenuSettings />
                  </PageTransition>
                } 
              />
              <Route 
                path="settings/roles" 
                element={
                  <PageTransition>
                    <RolePermissions />
                  </PageTransition>
                } 
              />
              <Route 
                path="settings/stores" 
                element={
                  <PageTransition>
                    <StoreSettings />
                  </PageTransition>
                } 
              />
              <Route 
                path="settings/activity" 
                element={
                  <PageTransition>
                    <UserActivity />
                  </PageTransition>
                } 
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
