import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AUTH_SESSION_KEY, ROLES, authenticateUser, registerDemoUser } from './demoUsers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For session restore

  // Restore session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id && parsed.role && Object.values(ROLES).includes(parsed.role)) {
          setUser(parsed);
          setIsAuthenticated(true);
        }
      }
    } catch {
      localStorage.removeItem(AUTH_SESSION_KEY);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email, password, expectedRole) => {
    const result = authenticateUser(email, password, expectedRole);
    if (result.success) {
      const session = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        avatar: result.user.avatar,
        ...(result.user.stationId ? { stationId: result.user.stationId } : {}),
      };
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
      setUser(session);
      setIsAuthenticated(true);
      return { success: true, user: session };
    }
    return result;
  }, []);

  const register = useCallback((userData) => {
    const result = registerDemoUser(userData);
    if (result.success) {
      const session = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        avatar: result.user.avatar,
        ...(result.user.stationId ? { stationId: result.user.stationId } : {}),
      };
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
      setUser(session);
      setIsAuthenticated(true);
      return { success: true, user: session };
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_SESSION_KEY);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const role = user?.role || null;

  const getDashboardPath = useCallback(() => {
    if (!role) return '/login';
    return role === ROLES.FOOD_RESCUER ? '/rescuer/dashboard' : '/kitchen/dashboard';
  }, [role]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        role,
        login,
        logout,
        register,
        getDashboardPath,
        ROLES,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export { ROLES };
