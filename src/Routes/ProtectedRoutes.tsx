import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  console.log('Current path:', location.pathname);
  console.log('Token:', token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;