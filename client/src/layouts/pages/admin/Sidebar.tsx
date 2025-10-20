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

        {/* Quản lý dịch vụ */}
        <li>
          <button
            className="w-full flex items-center justify-between p-2 hover:bg-gray-700"
            onClick={() => toggleMenu('services')}
          >
            <span>
              <FaShoppingCart className="inline mr-2" /> Quản lý dịch vụ
            </span>
            <span>{openMenu === 'services' ? '▲' : '▼'}</span>
          </button>
          {openMenu === 'services' && (
            <ul className="ml-4">
              <li>
                <Link
                  to="category-tattoo"
                  className="block p-2 hover:bg-gray-700"
                >
                  Danh mục hình xăm
                </Link>
              </li>
              <li>
                <Link to="tattoos" className="block p-2 hover:bg-gray-700">
                  Dịch vụ hình xăm
                </Link>
              </li>
              <li>
                <Link
                  to="categorys-products"
                  className="block p-2 hover:bg-gray-700"
                >
                  Danh mục sản phẩm
                </Link>
              </li>
              <li>
                <Link to="list-product" className="block p-2 hover:bg-gray-700">
                  Danh sách sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to="product-management"
                  className="block p-2 hover:bg-gray-700"
                >
                  Sản phẩm
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button
            className="w-full flex items-center justify-between p-2 hover:bg-gray-700"
            onClick={() => toggleMenu('staff')}
          >
            <span>
              <FaUsers className="inline mr-2" /> Quản lý nhân viên
            </span>
            <span>{openMenu === 'staff' ? '▲' : '▼'}</span>
          </button>
          {openMenu === 'staff' && (
            <ul className="ml-4">
              <li>
                <Link to="all-user" className="block p-2 hover:bg-gray-700">
                  Nhân viên
                </Link>
              </li>
              <li>
                <Link to="approve-user" className="block p-2 hover:bg-gray-700">
                  Duyệt Nhân viên
                </Link>
              </li>
              <li>
                <Link to="timeslots" className="block p-2 hover:bg-gray-700">
                  Lịch làm việc
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/description"
                  className="block p-2 hover:bg-gray-700"
                >
                  Đánh giá nhân viên
                </Link>
              </li>
            </ul>
          )}
        </li>

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
                  to="/admin/customer-management"
                  className="block p-2 hover:bg-gray-700"
                >
                  Tất cả tài khoản
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/review-management"
                  className="block p-2 hover:bg-gray-700"
                >
                  Đánh giá của khách
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link
            to="/admin/blog-management"
            className="block p-2 hover:bg-gray-700"
          >
            <FaBook className="inline mr-2" /> Quản lý bài viết
          </Link>
        </li>

        <li>
          <Link
            to="/admin/voucher-management"
            className="block p-2 hover:bg-gray-700"
          >
            <FaGift className="inline mr-2" /> Quản lý voucher
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/branches" className="block p-2 hover:bg-gray-700">
            <MdMapsHomeWork className="inline mr-2" /> Quản lý chi nhánh
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/admin/contact-management"
            className="block p-2 hover:bg-gray-700"
          >
            <MdContactPhone className="inline mr-2" /> Quản lý liên hệ
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/appointment" className="block p-2 hover:bg-gray-700">
            <FaCalendarAlt className="inline mr-2" /> Quản lý lịch hẹn
          </Link>
        </li>
        <li>
          <Link
            to="/admin/payment-appointment"
            className="block p-2 hover:bg-gray-700"
          >
            <MdPayments className="inline mr-2" /> Quản lý thanh toán lịch hẹn
          </Link>
        </li>

        <li>
          <Link
            to="/admin/order-management"
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
