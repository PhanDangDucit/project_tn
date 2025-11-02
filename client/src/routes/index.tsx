import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

// Admin
import PrivateRoute from './private/PrivateRoute/PrivateRoute';
import { ROLE } from '~/constants';
import { NotLoggedMiddleware } from './private/middleware/MiddlewareRoute';
import { ProductCategoryManager } from '~/pages/admin/ProductCategoryManager';
import { ProductManager } from '~/pages/admin/ProductManager';
import { PostManager } from '~/pages/admin/PostManager';
import { PostCategoryManager } from '~/pages/admin/PostCategoryManager';
import { CustomerManager } from '~/pages/admin/CustomerManager';
import { ContactManager } from '~/pages/admin/ContactManager';
import { OrderManager } from '~/pages/admin/OrderManager';
import { AboutPage } from '~/pages/customers/About';
import { ContactPage } from '~/pages/customers/Contact';
import { NewsPage } from '~/pages/customers/News';
import { PostCategoriesPage } from '~/pages/customers/PostCategories';
import ProductCategoryPage from '~/pages/customers/ProductCategory';
import ProductDetail from '~/pages/customers/ProductDetail';
import ShoppingCart from '~/pages/customers/ShoppingCart';
import UserLayout from '~/layouts/pages/user/UserLayout';
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
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/posts/:name" element={<NewsPage />} />
        <Route path="/post-categories" element={<PostCategoriesPage />} />
        <Route path="/category/:category" element={<ProductCategoryPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route element={<NotLoggedMiddleware />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route
          path="/"
          element={<PrivateRoute allowedRoles={[ROLE.CUSTOMER]} />}
        >
          <Route path="/cart" element={<ShoppingCart />} />
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
            <Route
              path="product-categories"
              element={<ProductCategoryManager/>}
            />
            <Route
              path="products"
              element={<ProductManager/>}
            />
            <Route
              path="customers"
              element={<CustomerManager/>}
            />
            <Route
              path="post-categories"
              element={<PostCategoryManager/>}
            />
            <Route
              path="posts"
              element={<PostManager/>}
            />
            <Route
              path="contacts"
              element={<ContactManager/>}
            />
            <Route
              path="orders"
              element={<OrderManager/>}
            />
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
