import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

// Lazy loading pages

// Admin
import { NotLoggedMiddleware } from './private/middleware/MiddlewareRoute';
import PrivateRoute from './private/PrivateRoute/PrivateRoute';
import { ROLE } from '~/constants';
import UserLayout from '~/layouts/pages/user/UserLayout';

//home
const HomePage = lazy(() => import('../pages/home/HomePage'));

//auth
const Auth = lazy(() => import('../pages/auth/Auth'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const SignUpCustomerPage = lazy(
  () => import('../pages/auth/SignUpCustomerPage'),
);
const RequestPasswordReset = lazy(
  () => import('~/pages/auth/RequestPasswordReset'),
);
const ResetPasswordPage = lazy(() => import('~/pages/auth/ResetPasswordPage'));

//admin
const AdminLayout = lazy(() => import('../layouts/pages/admin/AdminLayout'));

//user
// const Account = lazy(() => import('../pages/user/profile/Account'));
// const Edit_Account = lazy(() => import('../pages/user/profile/Edit_Account'));
// const ChangePassword = lazy(
//   () => import('../pages/user/profile/ChangePassword'),
// );

//404
const NotFound = lazy(() => import('~/pages/404/NotFound'));

export default function AppRoutes() {
  return (
    <Routes>
      {/* landing page */}
      <Route element={<DefaultLayout />}>
        <Route index path="/" element={<HomePage />} />
      </Route>

      {/* user */}
      <Route element={<DefaultLayout />}>
        {/* <Route path="/scan-image" element={<ScanImage />} /> */}
      </Route>

      {/* home */}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Auth  */}
      <Route element={<DefaultLayout />}>
        <Route element={<NotLoggedMiddleware />}>
          <Route element={<DefaultLayout />}>
            <Route path="/auth" element={<Auth />}>
              <Route path="login" element={<LoginPage />} />
              {/* <Route path="register" element={<SignUpPage />} /> */}
              <Route
                path="register/customer"
                element={<SignUpCustomerPage />}
              />
              <Route
                path="request-password-reset"
                element={<RequestPasswordReset />}
              />
              <Route path="reset-password" element={<ResetPasswordPage />} />
            </Route>
          </Route>
        </Route>
      </Route>

      {/* admin */}
      <Route element={<DefaultLayout />}>
        <Route
          path="/admin"
          element={<PrivateRoute allowedRoles={[ROLE.ADMIN]} />}
        >
          <Route element={<AdminLayout />}>
            {/* <Route index element={<AdminDashboardPage />} /> */}
            {/* <Route
              path="categorys-products"
              element={<AdminCategory />}
            /> */}
          </Route>
        </Route>
      </Route>

      {/* user */}
      <Route element={<UserLayout />}>
        {/* <Route path="/appointment-list" element={<AppointmentList />} />
        <Route path="/order-management" element={<OrderManagement />} /> */}
      </Route>

      {/* 404 not found */}
      <Route element={<DefaultLayout />}>
        <Route errorElement={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
