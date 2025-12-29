import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {
  FaBox,
  FaMoneyBillWave,
  FaClipboardList,
  FaUsers,
  FaBlogger,
} from 'react-icons/fa';
import { useGetOrdersQuery } from '~/services/order/order.service';
import { useGetCustomerQuery } from '~/services/customer/customer.service';
import { useGetBlogsQuery } from '~/services/blog/blog.services';
import LoadingLocal from '~/components/loading/LoadingLocal';
import { Link } from 'react-router-dom';
import { getLinkImage } from '~/constants/functions';
import {useProductCountQuery } from '~/services/product/product.service';

const AdminDashboardPage: React.FC = () => {
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: usersData, isLoading: usersLoading } = useGetCustomerQuery();
  const { data: productsData, isLoading: productsLoading } =
    useProductCountQuery();
  const { data: blogsData } = useGetBlogsQuery();
  console.log('Orders Data:', ordersData);

  const totalOrderRevenue =
    ordersData?.data?.reduce(
      (sum, order) =>
        order.order_status == 'received' && order.is_payment
          ? sum + (Number(order.final_total) || 0)
          : sum,
      0,
    ) || 0;

  const totalRevenue = totalOrderRevenue;
  console.log('Total Revenue:', totalRevenue);

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
  console.log('Order Status Stats:', orderStatusStats);
  console.log('user:', usersData);

  const totalOrders = ordersData?.data?.length || 0;
  const totalUsers = usersData?.data?.length || 0;
  const totalProducts = productsData?.data?.count || 0;

  const orderPieData = [
    {
      name: 'PENDING',
      value: orderStatusStats['pending'] || 0,
      color: '#FBBF24',
    },
    {
      name: 'RECEIVED',
      value: orderStatusStats['received'] || 0,
      color: '#3B82F6',
    },
    // {
    //   name: 'SHIPPING',
    //   value: orderStatusStats['SHIPPING'] || 0,
    //   color: '#F97316',
    // },
    {
      name: 'DELIVERED',
      value: orderStatusStats['delivered'] || 0,
      color: '#10B981',
    },
    {
      name: 'CANCELED',
      value: orderStatusStats['cancelled'] || 0,
      color: '#EF4444',
    },
  ].filter((item) => item.value > 0);
  console.log('Order Pie Data:', orderPieData);
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
          <p className="text-sm uppercase font-semibold">Số lượng khách hàng</p>
        </div>
        <div className="bg-linear-to-br from-gray-900 to-gray-700 rounded-xl p-5 shadow-lg flex flex-col justify-between h-40">
          <div className="flex justify-between items-center">
            <FaBlogger className="text-3xl text-yellow-400" />
            <div className="text-3xl font-bold">{blogsData?.data?.length}</div>
          </div>
          <p className="text-sm uppercase font-semibold">Tổng bài viết</p>
        </div>
      </div>
      {/* Order  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-linear-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">
            THỐNG KÊ ĐƠN HÀNG
          </h2>
          {orderPieData.length > 0 ? (
            <PieChart width={500} height={500} className='mx-auto'>
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2! gap-6">
        {/* Recent Orders */}
        <div className="bg-linear-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold uppercase">Các đơn hàng gần đây</h2>
            <span className="text-sm text-gray-400 cursor-pointer hover:text-gray-200">
              <Link to="/admin/orders">Xem tất cả</Link>
            </span>
          </div>
          <div className=''>
            {
              ordersData?.data && ordersData?.data.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="border-b border-gray-700 py-2"
                >
                  <p>
                    <span className="font-semibold">Mã đơn:</span> {order.code}
                  </p>
                  <p>
                    <span className="font-semibold">Khách hàng:</span>{' '}
                    {order.customer?.full_name || 'Khách vãng lai'}
                  </p>
                  <p>
                    <span className="font-semibold">Trạng thái:</span>{' '}
                    {order.order_status}
                  </p>
                  <p>
                    <span className="font-semibold">Tổng tiền:</span>{' '}
                    {Number(order.final_total).toLocaleString()} VND
                  </p>
                </div>
              ))
            }
          </div>
        </div>
        {/* Customers */}
        <div className="bg-linear-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold uppercase">Khách hàng mới</h2>
          </div>
          <div>
            {usersData?.data && usersData?.data.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="border-b border-gray-700 py-2 flex gap-4"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={getLinkImage(user?.avatar) }
                    alt="ảnh"
                    className="w-12 h-12 object-cover rounded-full mb-2"
                  />
                </div>
                <div className='flex flex-col gap-4'>
                  <p>
                    <span className="font-semibold">Tên:</span> {user.full_name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-semibold">Số điện thoại:</span> {user.phone}
                  </p>
               </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;