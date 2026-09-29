import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { RescueProvider } from './context/RescueContext';

// Pages
import LoginPage from './pages/LoginPage';
import RescuerLogin from './pages/RescuerLogin';
import KitchenLogin from './pages/KitchenLogin';
import RescuerDashboard from './pages/RescuerDashboard';
import KitchenDashboard from './pages/KitchenDashboard';
import AccessDenied from './pages/AccessDenied';

/**
 * AppRoutes - Wrapped inside AuthProvider so ProtectedRoute can access auth.
 * RescueProvider wraps only authenticated dashboard routes so it can read role from AuthContext.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/rescuer" element={<RescuerLogin />} />
      <Route path="/login/kitchen" element={<KitchenLogin />} />
      <Route path="/access-denied" element={<AccessDenied />} />

      {/* Protected Rescuer routes */}
      <Route path="/rescuer/*" element={
        <ProtectedRoute allowedRoles={['FOOD_RESCUER']}>
          <RescueProvider>
            <Routes>
              <Route path="dashboard" element={<RescuerDashboard />} />
              <Route path="map" element={<RescuerDashboard />} />
              <Route path="profile" element={<RescuerDashboard />} />
              <Route path="missions" element={<RescuerDashboard />} />
              <Route path="*" element={<Navigate to="/rescuer/dashboard" replace />} />
            </Routes>
          </RescueProvider>
        </ProtectedRoute>
      } />

      {/* Protected Kitchen routes */}
      <Route path="/kitchen/*" element={
        <ProtectedRoute allowedRoles={['KITCHEN_DISPATCH']}>
          <RescueProvider>
            <Routes>
              <Route path="dashboard" element={<KitchenDashboard />} />
              <Route path="dispatch" element={<KitchenDashboard />} />
              <Route path="reservations" element={<KitchenDashboard />} />
              <Route path="expired" element={<KitchenDashboard />} />
              <Route path="*" element={<Navigate to="/kitchen/dashboard" replace />} />
            </Routes>
          </RescueProvider>
        </ProtectedRoute>
      } />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
