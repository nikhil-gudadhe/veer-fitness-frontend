import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from '../store/Slices/authSlice';
import { AppDispatch, RootState } from '../store/store.ts';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import DefaultLayout from './layout/DefaultLayout';
import AuthLayout from './components/AuthLayout';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setAuthChecked(true));
  }, [dispatch]);

  if (loading && !authChecked) {
    return <Loader />;
  }

  console.log('isAuthenticated', isAuthenticated)

  return (
    <Routes>
      <Route
        path="signin"
        element={
          <AuthLayout authentication={false}>
            <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignIn />
          </AuthLayout>
        }
      />
      <Route
        path="signup"
        element={
          <AuthLayout authentication={false}>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignUp />
          </AuthLayout>
        }
      />
      <Route
        path="/"
        element={
          <DefaultLayout>
            <AuthLayout authentication={true}>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </AuthLayout>
          </DefaultLayout>
        }
      />
      <Route
        path="calendar"
        element={
          <DefaultLayout>
            <AuthLayout authentication={true}>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </AuthLayout>
          </DefaultLayout>
        }
      />
      <Route
        path="forms/form-elements"
        element={
          <DefaultLayout>
            <AuthLayout authentication={true}>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </AuthLayout>
          </DefaultLayout>
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/signin"} replace />}
      />
    </Routes>
  );
}

export default App;
