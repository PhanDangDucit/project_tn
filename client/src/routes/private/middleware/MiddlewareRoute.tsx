import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/HookRouter';
import { RootState } from '~/redux/storage/store';

export function NotLoggedMiddleware() {
  const auth = useAppSelector((state: RootState) => state.auth);
  console.log('NotLoggedMiddleware auth:', auth);

  if (auth.loggedIn && auth.accessToken) {
    switch (auth.role) {
      case 'admin':
        return <Navigate to="/admin" />;
      case 'customer':
        return <Navigate to="/" />;
    }
  } else {
    return <Outlet />;
  }
}