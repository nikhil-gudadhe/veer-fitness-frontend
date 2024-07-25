import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Or useContext if using React Context

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated); // Example for Redux

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/signin" />;
};

export default ProtectedRoute;