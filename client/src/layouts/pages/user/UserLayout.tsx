import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '~/components/customers/Footer';
import { Header } from '~/components/customers/Header';

const UserLayout: React.FC<object> = () => {
  const [cartOverlayOpen, setCartOverlayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        cartOverlayOpen={cartOverlayOpen}
        onCartClick={() => setCartOverlayOpen(!cartOverlayOpen)}
      />
      <div className="">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default UserLayout;