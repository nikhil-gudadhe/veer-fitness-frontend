import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from '../store/Slices/authSlice';
import { AppDispatch, RootState } from '../store/store.ts';
import { ToastContainer } from 'react-toastify';
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
  Invoice,
  Dropdowns 
} from './components/index.ts';
//import DataTable from './pages/ProElements/DataTable.tsx';
import DataTable from './components/DataTable.tsx';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {dispatch(getCurrentUser());
  }, [dispatch]);

  //console.log('isAuthenticated', isAuthenticated)

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

      <Route
        path="all-members"
        element={
          <DefaultLayout>
            <AuthLayout authentication={true}>
              <PageTitle title="Members Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Membership Plan Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
              <PageTitle title="Membership Setting Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <MembershipSetting />
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

      <Route path="ui/invoice" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Invoice | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Invoice />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/dropdowns" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Invoice | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Dropdowns />
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/datatable" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="DataTable | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          {/* <DataTable /> */}
          </AuthLayout>
        </DefaultLayout>
      } />

      <Route path="ui/loader" element={
        <DefaultLayout>
          <AuthLayout authentication={true}>
          <PageTitle title="Invoice | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Loader />
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
    </>
  );
}

export default App;
