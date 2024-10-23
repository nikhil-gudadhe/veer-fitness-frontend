import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from '../store/Slices/authSlice';
import { AppDispatch, RootState } from '../store/store.ts';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';  
import { Loader, PageTitle, SignIn, SignUp, ECommerce, DefaultLayout, AuthLayout, Member, Enquiry } from './components/index.ts';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getCurrentUser()); // Attempt to get the current user if not authenticated
    }
  }, [dispatch, isAuthenticated]);
  

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      //navigate('/signin');
    }
  }, [loading, isAuthenticated, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route
          path="signin"
          element={
            <AuthLayout authentication={false}>
              <PageTitle title="Signin | Veer Fitness - Your Ultimate Gym Management Solution" />
              <SignIn />
            </AuthLayout>
          }
        />
        
        <Route
          path="signup"
          element={
            <AuthLayout authentication={false}>
              <PageTitle title="Signup | Veer Fitness - Your Ultimate Gym Management Solution" />
              <SignUp />
            </AuthLayout>
          }
        />

        <Route
          path="/"
          element={
            <DefaultLayout>
              <AuthLayout authentication={true}>
                <PageTitle title="eCommerce Dashboard | Veer Fitness - Your Ultimate Gym Management Solution" />
                <ECommerce />
              </AuthLayout>
            </DefaultLayout>
          }
        />

        <Route
          path="enquiry"
          element={
            <DefaultLayout>
              <AuthLayout authentication={true}>
                <PageTitle title="Enquiry Dashboard | Veer Fitness - Your Ultimate Gym Management Solution" />
                <Enquiry />
              </AuthLayout>
            </DefaultLayout>
          }
        />

        <Route
          path="all-members"
          element={
            <DefaultLayout>
              <AuthLayout authentication={true}>
                <PageTitle title="Members Dashboard | Veer Fitness - Your Ultimate Gym Management Solution" />
                <Member />
              </AuthLayout>
            </DefaultLayout>
          }
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            !loading && isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              !loading && <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
