import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts'; // Adjust the import according to your file structure
import LoginPopup from '../components/LoginPopup.tsx'; // Adjust the import according to your file structure

interface AuthLayoutProps {
  children: React.ReactNode;
  authentication: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, authentication }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate('/signin');
    }
  }, [authStatus, authentication, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking authentication
  }

  if (authentication && !authStatus) {
    return <LoginPopup />;
  }

  return <>{children}</>;
};

export default AuthLayout;