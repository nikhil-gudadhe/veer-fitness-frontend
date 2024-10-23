import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import LoginPopup from '../components/LoginPopup.tsx';

interface AuthLayoutProps {
  children: React.ReactNode;
  authentication: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, authentication }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const [initialLoad, setInitialLoad] = React.useState(true);

  useEffect(() => {
    if (!loading) {
      setInitialLoad(false); // Set to false once loading completes
    }
  }, [loading]);

  useEffect(() => {
    if (!initialLoad && authentication && !authStatus) {
      navigate('/signin');
    }
  }, [authStatus, authentication, navigate, loading, initialLoad]);

  if (loading || initialLoad) {
    return <div>Loading...</div>; // Show a loading state while fetching authentication status
  }

  if (authentication && !authStatus) {
    return <LoginPopup />; // Show login popup if the user is not authenticated
  }

  return <>{children}</>;
};

export default AuthLayout;
