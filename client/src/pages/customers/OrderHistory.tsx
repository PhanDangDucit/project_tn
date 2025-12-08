import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { ProfileSidebar } from '~/layouts/pages/user/ProfileSidebar';
import { FaEdit } from 'react-icons/fa';
import { Eye } from 'lucide-react';
import { useCancelOrderMutation, useGetOrdersByUserIdQuery } from '~/services/order/order.service';
import { useGetMeQuery } from '~/services/auth/auth.services';
import { TOrder } from '~/interfaces/types/order';
import { Toastify } from '~/helpers/Toastify';


export const OrderHistory: React.FC<object> = () => {
  const [orderStatus, setOrderStatus] = useState<string>("pending");
  const navigate = useNavigate();
  const { data: userData } = useGetMeQuery();
  const {data: orderDatas, isLoading} = useGetOrdersByUserIdQuery(userData?.data?.id!);
  const [cancelOrder] = useCancelOrderMutation();
  
  // const formatPrice = (num: number) => {
  //     return num.toLocaleString('vi-VN');
  // };
  function formatPrice(price: string, currency: string) {
    return Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
  }
  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
      try {
        await cancelOrder({ id: orderId, status: 'canceled' }).unwrap();
        Toastify('Hủy đơn hàng thành công!', 200);
      } catch (error) {
        Toastify('Hủy đơn hàng thất bại.', 400);
      }
    }
  };
  const handleClickOrderStatus = (type: string = "pending") => {
    setOrderStatus(type);
  }

  const filteredOrders = orderDatas?.data?.filter(
    (order: TOrder) => order.order_status === orderStatus
  );

  return (
      <div className='flex flex-wrap py-20 max-w-[1200px] mx-auto min-h-[1000px]'>
        <div className='w-3/12 relative'>
          <ProfileSidebar/>
        </div>
        <div className="w-9/12 flex flex-col gap-4">
          {/* Top */}
          <div className='flex flex-col gap-4'>
            <h1 className='font-bold text-3xl'>Lịch sử đơn hàng</h1>
            <ul className='grid grid-cols-4 bg-black py-4'>
              <li 
                className={orderStatus == "pending" ? "font-bold text-xl" : ""} 
                onClick={() => handleClickOrderStatus("pending")}
              >
                <p className='border-r text-white px-3 text-center cursor-pointer'>Đang xử lý</p>
              </li>
              <li 
                className={orderStatus == "delivering" ? "font-bold text-xl" : ""} 
                onClick={() => handleClickOrderStatus("delivering")}
              >
                <p className='border-r text-white px-3 text-center cursor-pointer'>Đang giao hàng</p>
              </li>
              <li 
                className={orderStatus == "received" ? "font-bold text-xl" : ""} 
                onClick={() => handleClickOrderStatus("received")}
              >
                <p className='border-r text-white px-3 text-center cursor-pointer'>Đã nhận</p>
              </li>
              <li 
                className={orderStatus == "canceled" ? "font-bold text-xl" : ""} 
                onClick={() => handleClickOrderStatus("cancelled")}
              >
                <p className='border-r text-white px-3 text-center cursor-pointer'>Đã hủy</p>
              </li>
            </ul>
          </div>
          {/* Table */}
          <table className="w-full">
            <thead className="">
                <th>Mã đơn hàng</th>
                <th></th>
                <th>Tổng tiền</th>
                <th>Thanh toán</th>
                <th>Thời gian đặt</th>
                <th>Hành động</th>
            </thead>
            <tbody>
                {isLoading ? (
                    <div className="text-center text-gray-500">Đang tải...</div>
                ) : (
                   <>
                      {!filteredOrders?.length ? (
                          <tr>
                            <td colSpan={6} className=" text-center text-gray-500">Không có đơn hàng nào!</td>
                          </tr>
                      ) : (
                        <>
                          {filteredOrders?.map((order: TOrder) => (
                          <tr>
                            <td className='text-center'>{order.code}</td>
                            <td className='text-center'></td>
                            <td className='text-center'>{formatPrice(String(order.final_total) ?? 0, '₫')}</td>
                            <td className='text-center'>{order.is_payment? "đã thanh toán" : "chưa thanh toán"}</td>
                            <td className='text-center'>{new Date(order.created_at!).toLocaleString('vi-VN')}</td>
                            <td className="px-4 py-3 flex items-center justify-center space-x-2 mt-2">
                              <button
                              onClick={() => navigate(`/order-history/${order.id}`)}
                              className="bg-green-600 text-white px-3 py-1 rounded flex items-center"
                              >
                                  <Eye className="mr-1" /> Xem
                              </button>
                              {order.order_status === 'pending' && (
                                <button
                                    onClick={() => handleCancelOrder(order.id!)}
                                    className="bg-red-600 text-white px-3 py-1 rounded flex items-center"
                                >
                                    <FaEdit className="mr-1" /> Hủy
                                </button>
                              )}
                            </td>
                          </tr>))}
                        </> 
                      )}
                    </>
                  )}
            </tbody>
          </table>
        </div>
      </div>
  );
};