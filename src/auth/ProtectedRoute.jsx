import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * ProtectedRoute - Guards routes by authentication + role
 * 
 * If not authenticated → redirect to /login
 * If authenticated but wrong role → redirect to own dashboard
 */
export const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, isLoading, role, getDashboardPath } = useAuth();

  // Show nothing while checking session (prevents flash of login page)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-5xl animate-pulse">🚨</div>
          <div className="text-slate-400 font-mono text-sm animate-pulse">Restoring session...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={getDashboardPath()} replace />;
  }

  return children;
};
