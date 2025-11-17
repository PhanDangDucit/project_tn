import { useState } from 'react';
import { Button } from 'react-daisyui';
import { Logo } from '~/assets/images';
import {
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaBell as FaBellOutline,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppSelector } from '~/hooks/HookRouter';
import { RootState } from '~/redux/storage/store';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const auth = useAppSelector((state: RootState) => state.auth.currentUser);

  return (
    <div className="bg-black text-white p-4 fixed w-full top-0 flex justify-between items-center shadow-lg z-[999]">
      <a href="#">
        <img className="h-100% w-[75px]" src={Logo} alt="Logo" />
      </a>

      {/* Các nút bên phải */}
      <div className="flex items-center space-x-4">
        {/* Avatar + tên admin + dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center bg-white text-black px-3 py-1 rounded-full shadow border border-gray-300"
          >
            {auth?.id ? (
              <div className="flex items-center">
                <div className="w-10 h-10 border border-gray-300 rounded-full overflow-hidden mr-2">
                  <img
                    src={auth?.avatar}
                    alt="ảnh"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-bold">{auth?.full_name}</p>
                  <p className="text-xs text-black">Quản trị viên</p>
                </div>
              </div>
            ) : (
              <Link to="/auth/login">
                <Button color="primary" className="flex w-full text-white">
                  <FaSignOutAlt className="mr-2 text-base" />
                  <p>Đăng nhập</p>
                </Button>
              </Link>
            )}
          </button>

          {/* Dropdown menu user */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-[180px] bg-white rounded-lg shadow-lg border border-gray-300">
              <p className="px-4 py-2 text-sm font-bold text-gray-700 border-b">
                My Account
              </p>
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <FaUser className="mr-2 text-black" />{' '}
                  <Link to={`/admin/profile/${auth?.id}`}>
                    <p className="text-black">Profile</p>
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <FaCog className="mr-2 text-black" />{' '}
                  <Link to={`/admin/Website-Config`}>
                    <p className="text-black">Setting</p>
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <FaBellOutline className="mr-2 text-black" />{' '}
                  <p className="text-black">Notification</p>
                </li>
                <Button
                  className="w-full justify-start cursor-pointer flex items-center"
                  // onClick={handleLogout}
                  // disabled={isLoading}
                >
                  <FaSignOutAlt className="mr-2 text-black" />{' '}
                  <p className="text-black">Log out</p>
                </Button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
