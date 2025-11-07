import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CartOverlay from '~/components/customers/CartOverlay';
import Footer from '~/components/customers/Footer';
import { Header } from '~/components/customers/Header';
import { Toastify } from '~/helpers/Toastify';
import { useAppSelector } from '~/hooks/HookRouter';
import { RootState } from '~/redux/storage/store';

const UserLayout: React.FC<object> = () => {
  const [cartOverlayOpen, setCartOverlayOpen] = useState(false);
  const auth = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  
  /**
   * Handle click cart icon
   */
  const handleClickCartIcon = () => {
    if(auth.loggedIn) {
      setCartOverlayOpen(!cartOverlayOpen);
    } else {
      Toastify('Vui lòng đăng nhập để tiếp tục', 400);
      navigate('/login');
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        cartOverlayOpen={cartOverlayOpen}
        onCartClick={handleClickCartIcon}
      />
      <div className="">
        <Outlet />
      </div>
      <Footer/>
       <CartOverlay
        isOpen={cartOverlayOpen}
        onClose={() => setCartOverlayOpen(false)}
      />
    </div>
  );
};

export default UserLayout;