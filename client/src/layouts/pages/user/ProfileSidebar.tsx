import { Link } from 'react-router-dom';

export const ProfileSidebar = () => {
  return (
    <ul className='px-4'>
      {/* Quản lý liên hệ */}
      <li className="mb-2">
        <Link
          to="/profile"
          className="block p-2 bg-gray-700 text-white"
        >
          Thông tin cá nhân
        </Link>
      </li>
      <li className="mb-2">
        <Link
          to="/order-history"
          className="block p-2 bg-gray-700 text-white"
        >
          Lịch sử đơn hàng
        </Link>
      </li>
      <li className="mb-2">
        <Link
          to="/change-pasword"
          className="block p-2 bg-gray-700 text-white"
        >
          Đổi mật khẩu
        </Link>
      </li>
    </ul>
  );
};