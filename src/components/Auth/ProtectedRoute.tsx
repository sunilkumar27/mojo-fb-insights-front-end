import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFacebookAuth } from '../../hooks/useFacebookAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Route to navigate back to login if not authenticated.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useFacebookAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-facebook"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};