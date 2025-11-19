import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {
  FaBox,
  FaMoneyBillWave,
  FaClipboardList,
  FaUsers,
  FaBlogger,
  // FaHourglassHalf,
  // FaCalendarCheck,
  // FaImages,
  // FaBlogger,
  // FaHome,
} from 'react-icons/fa';
import { useGetOrdersQuery } from '~/services/order/order.service';
import { useGetCustomerQuery } from '~/services/customer/customer.service';
import { useGetProductCategoriesQuery } from '~/services/product-category/productCategories.service';
// import { useGetPaymentMethodsQuery } from '~/services/payment-methods/payment-method.service';
import { useGetBlogsQuery } from '~/services/blog/blog.services';
import LoadingLocal from '~/components/loading/LoadingLocal';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: usersData, isLoading: usersLoading } = useGetCustomerQuery();
  const { data: productsData, isLoading: productsLoading } =
    useGetProductCategoriesQuery();
  // const { data: paymentsData, isLoading: paymentsLoading } =
  //   useGetPaymentMethodsQuery();
  const { data: blogsData } = useGetBlogsQuery();

  const totalOrderRevenue =
    ordersData?.data?.reduce(
      (sum, order) =>
        order.order_status === 'DELIVERED' ? sum + (order.total || 0) : sum,
      0,
    ) || 0;

  const totalRevenue = totalOrderRevenue;

  const orderStatusStats =
    ordersData?.data?.reduce(
      (acc, order) => {
        if (order.order_status) {
          acc[order.order_status] = (acc[order.order_status] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    ) || {};

  const totalOrders = ordersData?.data?.length || 0;
  const totalUsers = usersData?.data?.length || 0;
  const totalProducts = productsData?.data?.length || 0;

  const orderPieData = [
    {
      name: 'PENDING',
      value: orderStatusStats['PENDING'] || 0,
      color: '#FBBF24',
    },
    {
      name: 'CONFIRMED',
      value: orderStatusStats['CONFIRMED'] || 0,
      color: '#3B82F6',
    },
    {
      name: 'SHIPPING',
      value: orderStatusStats['SHIPPING'] || 0,
      color: '#F97316',
    },
    {
      name: 'DELIVERED',
      value: orderStatusStats['DELIVERED'] || 0,
      color: '#10B981',
    },
    {
      name: 'CANCELED',
      value: orderStatusStats['CANCELED'] || 0,
      color: '#EF4444',
    },
  ].filter((item) => item.value > 0);

  if (
    ordersLoading ||
    usersLoading ||
    productsLoading 
    // ||
    // paymentsLoading
  ) {
    return <LoadingLocal />;
  }

  return (
    <div className="w-full min-h-screen text-white p-6">
      <div className="relative w-full h-48 mb-8">
        <img
          src="/images/admin/Banner_admin.png"
          alt="Background"
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
        <div className="absolute top-12 left-10 text-white">
          <p className="text-2xl">XIN CHÀO!</p>
          <p className="text-4xl font-bold tracking-wide">ADMIN</p>
        </div>
      </div>
      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3! lg:grid-cols-5! gap-6 mb-8">
        <div className="bg-linear-to-br from-gray-900 to-gray-700 rounded-xl p-5 shadow-lg flex flex-col justify-between h-40">
          <div className="flex justify-between items-center">
            <FaMoneyBillWave className="text-3xl text-yellow-400 mr-2" />
            <div className="text-xl font-bold">
              {totalRevenue.toLocaleString()} VND
            </div>
          </div>
          <p className="text-sm uppercase font-semibold">
            Tổng doanh thu
          </p>
        </div>
        <div className="bg-linear-to-br from-gray-900 to-gray-700 rounded-xl p-5 shadow-lg flex flex-col justify-between h-40">
          <div className="flex justify-between items-center">
            <FaBox className="text-3xl text-yellow-400" />
            <div className="text-3xl font-bold">{totalProducts}</div>
          </div>
          <p className="text-sm uppercase font-semibold">Số lượng sản phẩm</p>
        </div>
        <div className="bg-linear-to-br from-gray-900 to-gray-700 rounded-xl p-5 shadow-lg flex flex-col justify-between h-40">
          <div className="flex justify-between items-center">
            <FaClipboardList className="text-3xl text-yellow-400" />
            <div className="text-3xl font-bold">{totalOrders}</div>
          </div>
          <p className="text-sm uppercase font-semibold">Số lượng đơn hàng</p>
        </div>
        <div className="bg-linear-to-br from-gray-900 to-gray-700 rounded-xl p-5 shadow-lg flex flex-col justify-between h-40">
          <div className="flex justify-between items-center">
            <FaUsers className="text-3xl text-yellow-400" />
            <div className="text-3xl font-bold">{totalUsers}</div>
          </div>
          <p className="text-sm uppercase font-semibold">Số lượng người dùng</p>
        </div>
        <div className="bg-linear-to-br from-gray-900 to-gray-700 rounded-xl p-5 shadow-lg flex flex-col justify-between h-40">
          <div className="flex justify-between items-center">
            <FaBlogger className="text-3xl text-yellow-400" />
            <div className="text-3xl font-bold">{blogsData?.data?.length}</div>
          </div>
          <p className="text-sm uppercase font-semibold">Tổng bài viết</p>
        </div>
      </div>
      {/* Order Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-linear-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">
            THỐNG KÊ ĐƠN HÀNG
          </h2>
          {orderPieData.length > 0 ? (
            <PieChart width={300} height={300}>
              <Pie
                data={orderPieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {orderPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <p className="text-center text-gray-400">
              Chưa có dữ liệu đơn hàng.
            </p>
          )}
        </div>
        <div className="bg-linear-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold uppercase">Các đơn hàng gần đây</h2>
            <span className="text-sm text-gray-400 cursor-pointer hover:text-gray-200">
              <Link to="/admin/orders">Xem tất cả</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;