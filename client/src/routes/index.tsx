import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

// Admin
import PrivateRoute from './private/PrivateRoute/PrivateRoute';
import { ROLE } from '~/constants';
import { NotLoggedMiddleware } from './private/middleware/MiddlewareRoute';
const AdminLayout = lazy(() => import('../layouts/pages/admin/AdminLayout'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));


// customers
const HomePage = lazy(() => import('../pages/home/HomePage'));
const LoginPage = lazy(() => import('../pages/customers/Login'));
const RegisterPage = lazy(() => import('../pages/customers/Register'));
const NotFound = lazy(() => import('~/pages/404/NotFound'));

export default function AppRoutes() {
  return (
    <Routes>
      {/* customer */}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route element={<NotLoggedMiddleware />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {/* <Route path="/scan-image" element={<ScanImage />} /> */}
      </Route>

      {/* admin */}
      <Route element={<DefaultLayout />}>
        <Route element={<NotLoggedMiddleware />}>
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>
        <Route
          path="/admin"
          element={<PrivateRoute allowedRoles={[ROLE.ADMIN]} />}
        >
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            {/* <Route
              path="/dashboard"
              element={<AdminDashboardPage/>}
            /> */}
          </Route>
        </Route>
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
