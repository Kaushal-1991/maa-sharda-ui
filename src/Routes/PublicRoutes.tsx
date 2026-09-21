import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoutes: React.FC<PublicRouteProps> = ({ children }) => {

  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoutes;