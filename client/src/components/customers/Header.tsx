import { Heart, Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Navigation } from './Navigation';
import { UserDropDown } from './UserDropDown';
import { Logo } from '~/assets/images';
import { Link } from 'react-router-dom';

export function Header({ cartOverlayOpen, onCartClick }: { cartOverlayOpen: boolean; onCartClick: () => void }) {
  const { cartCount } = useCart();
  
  return (
    <>
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center hover:opacity-80 transition">
              <img src={Logo} alt="Fitness Store" className="h-12 w-auto" />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Heart className="w-5 h-5" />
              </button>

            {/* User / Auth dropdown */}
              <UserDropDown/>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation />
     
    </>
  );
}