import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from '../store/Slices/authSlice';
import { AppDispatch, RootState } from '../store/store.ts';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile.tsx';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout.tsx';
import Tables from './pages/Tables.tsx';
import Settings from './pages/Settings.tsx';
import Chart from './pages/Chart.tsx';
import Alerts from './pages/UiElements/Alerts.tsx';
import Buttons from './pages/UiElements/Buttons.tsx';
import DefaultLayout from './layout/DefaultLayout';
import AuthLayout from './components/AuthLayout';
//import AllEnquries from './pages/Enquiry/AllEnquries.tsx';
import Enquiry from './pages/Enquiry/Enquiry.tsx';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => { dispatch(getCurrentUser());
  }, [dispatch]);

  console.log('isAuthenticated', isAuthenticated)

  return loading ? (
    <Loader />
  ) : (
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
        path="enquiry"
        element={
          <DefaultLayout>
            <AuthLayout authentication={true}>
              <PageTitle title="Enquiry Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Enquiry />
            </AuthLayout>
          </DefaultLayout>
        }
      />

      <Route path="calendar" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Calendar />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="profile" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Profile />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="forms/form-elements" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <FormElements />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="forms/form-layout" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <FormLayout />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="tables" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          </AuthLayout>
          <Tables />
        </DefaultLayout>
      } />

      <Route path="settings" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Settings />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="chart" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Chart />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/alerts" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Alerts />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/buttons" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Buttons />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/signin"} replace />}
      />
    </Routes>
  );
}

export default App;
