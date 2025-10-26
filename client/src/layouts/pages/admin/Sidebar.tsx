import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaShoppingCart, FaBook } from 'react-icons/fa';
import { MdMapsHomeWork } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdPayments } from 'react-icons/md';
import { RiBillFill } from 'react-icons/ri';
import { FaGift } from 'react-icons/fa';
import { MdContactPhone } from 'react-icons/md';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  return (
    <div className="w-64 py-10 h-screen bg-black text-white p-6 overflow-y-scroll fixed leading-10 font-semibold ">
      {/* <div className="w-[90px] ml-[50px] rotate-90 ">
        <img src="../public/images/admin/logo.jpg" alt="" />
      </div> */}
      <ul>
        <li className="mb-2 mt-10 w-full">
          <Link
            to="/admin"
            className=" p-2 hover:bg-gray-700 flex items-center"
          >
            <FaHome className="mr-2" />
            Tổng quan
          </Link>
        </li>

        {/* Quản lý sản phẩm */}
        <li>
          <button
            className="w-full flex items-center justify-between p-2 hover:bg-gray-700"
            onClick={() => toggleMenu('services')}
          >
            <span>
              <FaShoppingCart className="inline mr-2" /> Quản lý sản phẩm
            </span>
            <span>{openMenu === 'services' ? '▲' : '▼'}</span>
          </button>
          {openMenu === 'services' && (
            <ul className="ml-4">
              <li>
                <Link
                  to="product-categories"
                  className="block p-2 hover:bg-gray-700"
                >
                  Danh mục sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to="products"
                  className="block p-2 hover:bg-gray-700"
                >
                  Sản phẩm
                </Link>
              </li>
            </ul>
          )}
        </li>
       
        {/* Quản lý khách hàng */}
        <li>
          <button
            className="w-full flex items-center justify-between p-2 hover:bg-gray-700"
            onClick={() => toggleMenu('customers')}
          >
            <span>
              <FaUsers className="inline mr-2" /> Quản lý khách
            </span>
            <span>{openMenu === 'customers' ? '▲' : '▼'}</span>
          </button>
          {openMenu === 'customers' && (
            <ul className="ml-4">
              <li>
                <Link
                  to="/admin/customers"
                  className="block p-2 hover:bg-gray-700"
                >
                  Tất cả tài khoản
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/admin/review-management"
                  className="block p-2 hover:bg-gray-700"
                >
                  Đánh giá của khách
                </Link>
              </li> */}
            </ul>
          )}
        </li>
         {/* Quản lý bài viết */}
        <li>
          <button
            className="w-full flex items-center justify-between p-2 hover:bg-gray-700"
            onClick={() => toggleMenu('blogs')}
          >
            <span>
              <FaBook className="inline mr-2" /> Quản lý bài viết
            </span>
            <span>{openMenu === 'blogs' ? '▲' : '▼'}</span>
          </button>
          {openMenu === 'blogs' && (
            <ul className="ml-4">
              <li>
                <Link
                  to="post-categories"
                  className="block p-2 hover:bg-gray-700"
                >
                  Danh mục bài viết
                </Link>
              </li>
              <li>
                <Link
                  to="posts"
                  className="block p-2 hover:bg-gray-700"
                >
                  Bài viết
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Quản lý liên hệ */}
        <li className="mb-2">
          <Link
            to="/admin/contacts"
            className="block p-2 hover:bg-gray-700"
          >
            <MdContactPhone className="inline mr-2" /> Quản lý liên hệ
          </Link>
        </li>
        {/* Quản lý thanh toán */}
        <li>
          <Link
            to="/admin/payment-appointment"
            className="block p-2 hover:bg-gray-700"
          >
            <MdPayments className="inline mr-2" /> Quản lý thanh toán
          </Link>
        </li>
        {/* Quản lý đơn hàng */}
        <li>
          <Link
            to="/admin/orders"
            className="block p-2 hover:bg-gray-700"
          >
            <RiBillFill className="inline mr-2" /> Quản lý đơn hàng
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
