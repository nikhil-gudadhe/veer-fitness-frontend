import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from '../store/Slices/authSlice';
import store, { AppDispatch, RootState } from '../store/store.ts';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';  
import { 
  Loader, 
  PageTitle,
  SignIn,
  SignUp,
  ECommerce,
  Calendar,
  Profile,
  FormElements,
  FormLayout,
  Tables,
  Settings,
  Chart,
  Alerts,
  Buttons,
  DefaultLayout,
  AuthLayout,
  Enquiry,
  Member,
  MembershipPlan,
  MembershipSetting,
  Dropdowns,
  Invoice, 
  User
} from './components/index.ts';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("isAuthenticated: ", isAuthenticated)
    console.log("Persisted Auth State:", store.getState().auth);
    dispatch(getCurrentUser());
  
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/signin');
    }
  }, [loading, isAuthenticated, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <>
    
    <ToastContainer 
    position="bottom-right"
    />

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

      <Route
        path="membership-plan"
        element={
          <DefaultLayout>
            <AuthLayout authentication={true}>
              <PageTitle title="Membership Plan Dashboard | Veer Fitness - Your Ultimate Gym Management Solution" />
              <MembershipPlan />
            </AuthLayout>
          </DefaultLayout>
        }
      />

      <Route
        path="membership-setting/:memberId"
        element={
          <DefaultLayout>
            <AuthLayout authentication={true}>
              <PageTitle title="Membership Setting Dashboard | Veer Fitness - Your Ultimate Gym Management Solution" />
              <MembershipSetting />
            </AuthLayout>
          </DefaultLayout>
        }
      />

      <Route
        path="user"
        element={
          <DefaultLayout>
            <AuthLayout authentication={true}>
              <PageTitle title="User Dashboard | Veer Fitness - Your Ultimate Gym Management Solution" />
              <User/>
            </AuthLayout>
          </DefaultLayout>
        }
      />

      <Route path="calendar" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Calendar | Veer Fitness - Your Ultimate Gym Management Solution" />
          <Calendar />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="profile" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Profile | Veer Fitness - Your Ultimate Gym Management Solution" />
          <Profile />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="forms/form-elements" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Form Elements | Veer Fitness - Your Ultimate Gym Management Solution" />
          <FormElements />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="forms/form-layout" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Form Layout | Veer Fitness - Your Ultimate Gym Management Solution" />
          <FormLayout />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="tables" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Tables | Veer Fitness - Your Ultimate Gym Management Solution" />
          </AuthLayout>
          <Tables />
        </DefaultLayout>
      } />

      <Route path="settings" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Settings | Veer Fitness - Your Ultimate Gym Management Solution" />
          <Settings />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="chart" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Basic Chart | Veer Fitness - Your Ultimate Gym Management Solution" />
          <Chart />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/invoice" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Invoice | Veer Fitness - Your Ultimate Gym Management Solution" />
          {/* <Invoice /> */}
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/dropdowns" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Invoice | Veer Fitness - Your Ultimate Gym Management Solution" />
          <Dropdowns />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/datatable" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="DataTable | Veer Fitness - Your Ultimate Gym Management Solution" />
          {/* <DataTable /> */}
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/loader" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Invoice | Veer Fitness - Your Ultimate Gym Management Solution" />
          <Loader />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/alerts" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Alerts | Veer Fitness - Your Ultimate Gym Management Solution" />
          <Alerts />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/buttons" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Buttons | Veer Fitness - Your Ultimate Gym Management Solution" />
          <Buttons />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/signin"} replace />}
      />
    </Routes>
    </>
  );
}

export default App;
