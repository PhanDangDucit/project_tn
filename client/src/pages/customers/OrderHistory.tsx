import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { ProfileSidebar } from '~/layouts/pages/user/ProfileSidebar';
import { FaEdit } from 'react-icons/fa';
import { Eye } from 'lucide-react';

export const OrderHistory: React.FC<object> = () => {
  const [orderStatus, setOrderStatus] = useState<string>("pending");
  
  const handleClickOrderStatus = (type: string = "pending") => {
    setOrderStatus(type);
  }

  return (
      <div className='flex flex-wrap py-20 max-w-[1200px] mx-auto'>
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
                <p className='border-r-[1px] text-white px-3 text-center cursor-pointer'>Đang xử lý</p>
              </li>
              <li 
                className={orderStatus == "delivering" ? "font-bold text-xl" : ""} 
                onClick={() => handleClickOrderStatus("delivering")}
              >
                <p className='border-r-[1px] text-white px-3 text-center cursor-pointer'>Đang giao hàng</p>
              </li>
              <li 
                className={orderStatus == "received" ? "font-bold text-xl" : ""} 
                onClick={() => handleClickOrderStatus("received")}
              >
                <p className='border-r-[1px] text-white px-3 text-center cursor-pointer'>Đã nhận</p>
              </li>
              <li 
                className={orderStatus == "canceled" ? "font-bold text-xl" : ""} 
                onClick={() => handleClickOrderStatus("canceled")}
              >
                <p className='border-r-[1px] text-white px-3 text-center cursor-pointer'>Đã hủy</p>
              </li>
            </ul>
          </div>
          {/* Table */}
          <table className="w-full">
            <thead className="">
                <th>ID</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Thanh toán</th>
                <th>Thời gian đặt</th>
                <th>Hành động</th>
            </thead>
            <tbody>
                <tr>
                  <td className='text-center'>21312</td>
                  <td className='text-center'>csadca</td>
                  <td className='text-center'>csadca</td>
                  <td className='text-center'>csadca</td>
                  <td className='text-center'>csadca</td>
                  <td className="px-4 py-3 flex items-center justify-center space-x-2 mt-2">
                    <button
                    // onClick={() => handleDeleteClick(product._id!)}
                    className="bg-green-600 text-white px-3 py-1 rounded flex items-center"
                    >
                        <Eye className="mr-1" /> Xem
                    </button>
                    <button
                        // onClick={() => handleEditClick(product)}
                        className="bg-red-600 text-white px-3 py-1 rounded flex items-center"
                    >
                        <FaEdit className="mr-1" /> Hủy
                    </button>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
  );
};