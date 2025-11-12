import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Eye } from 'lucide-react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TGetAllOrder, TOrder } from '~/interfaces/types/order';
import { useGetOrdersQuery, useUpdateOrderMutation } from '~/services/order/order.service';
import { Toastify } from '~/helpers/Toastify';
import { useNavigate } from 'react-router-dom';

export function OrderManager() {
  const { data: orderDatas, isLoading, refetch } = useGetOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const navigate = useNavigate();

  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TGetAllOrder | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TOrder>();

  const handleEditClick = (order: TGetAllOrder) => {
    setSelectedOrder(order);
    setValue('order_status', order.order_status);
    setValue('is_payment', order.is_payment);
    setValue('address', order.address);
    setValue('phone', order.phone);
    setShowModal(true);
  };

  const onSubmit: SubmitHandler<TOrder> = async (data) => {
    if (!selectedOrder) return;
    try {
      await updateOrder({ id: selectedOrder.id!, data }).unwrap();
      Toastify('Cập nhật đơn hàng thành công', 200);
      setShowModal(false);
      refetch();
    } catch (error) {
      Toastify('Cập nhật đơn hàng thất bại', 400);
    }
  };

  const formatPrice = (num: number) => {
    return num.toLocaleString('vi-VN');
  };

  const filteredOrders = orderDatas?.data?.filter((order: TGetAllOrder) => {
    const orderStatusMatch = orderStatusFilter === 'all' || order.order_status === orderStatusFilter;
    const paymentStatusMatch =
      paymentStatusFilter === 'all' ||
      (paymentStatusFilter === 'paid' && order.is_payment) ||
      (paymentStatusFilter === 'unpaid' && !order.is_payment);
    return orderStatusMatch && paymentStatusMatch;
  });

  const getStatusOptions = (currentStatus: string) => {
    if (currentStatus === 'received' || currentStatus === 'cancelled') {
      return [<option key={currentStatus} value={currentStatus}>{currentStatus}</option>];
    }
    if (currentStatus === 'delivering') {
      return [
        <option key="delivering" value="delivering">delivering</option>,
        <option key="received" value="received">received</option>,
        <option key="cancelled" value="cancelled">cancelled</option>,
      ];
    }
    // Default for 'pending'
    return [
      <option key="pending" value="pending">pending</option>,
      <option key="delivering" value="delivering">delivering</option>,
      <option key="received" value="received">received</option>,
      <option key="cancelled" value="cancelled">cancelled</option>,
    ];
  };

  return (
    <div className="p-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Quản lý Đơn hàng</h1>
        </div>
        <div className="flex gap-4">
          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Đang chờ</option>
            <option value="delivering">Đang giao</option>
            <option value="received">Đã nhận</option>
            <option value="cancelled">Đã hủy</option>
          </select>
          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">Tất cả thanh toán</option>
            <option value="paid">Đã thanh toán</option>
            <option value="unpaid">Chưa thanh toán</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="text-center text-gray-500">Đang tải...</div>
        ) : (
          <>
            {!filteredOrders?.length ? (
              <div className="col-span-full text-center text-gray-500 mt-10">
                Không có đơn hàng nào!
              </div>
            ) : (
              <table className="w-full mt-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">Mã đơn hàng</th>
                    <th>Email khách hàng</th>
                    <th>Trạng thái</th>
                    <th>Tổng tiền</th>
                    <th>Thanh toán</th>
                    <th>Thời gian đặt</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders?.map((order: TGetAllOrder) => (
                    <tr key={order.id} className="border-b">
                      <td className="text-center p-2">{order.code}</td>
                      <td className="text-center">{order.customer?.email ?? 'N/A'}</td>
                      <td className="text-center capitalize">{order.order_status}</td>
                      <td className="text-center">{formatPrice(order.final_total)} đ</td>
                      <td className="text-center">{order.is_payment ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                      <td className="text-center">{new Date(order.created_at!).toLocaleString('vi-VN')}</td>
                      <td className="px-4 py-3 flex items-center justify-center space-x-2">
                        <button
                          onClick={() => navigate(`/admin/order-history/${order.id}`)}
                          className="bg-green-600 text-white px-3 py-1 rounded flex items-center"
                        >
                          <Eye className="mr-1" /> Xem
                        </button>
                        <button
                          onClick={() => handleEditClick(order)}
                          className="bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                        >
                          <FaEdit className="mr-1" /> Sửa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      {/* Edit Order Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                    Chỉnh sửa đơn hàng #{selectedOrder?.code}
                  </DialogTitle>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                      <input type="text" id="address" {...register('address')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                      <input type="text" id="phone" {...register('phone')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
                    </div>
                    <div>
                      <label htmlFor="order_status" className="block text-sm font-medium text-gray-700">Trạng thái đơn hàng</label>
                      <select
                        id="order_status"
                        {...register('order_status')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        disabled={selectedOrder?.order_status === 'received' || selectedOrder?.order_status === 'cancelled'}
                      >
                        {selectedOrder && getStatusOptions(selectedOrder.order_status)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="is_payment" className="block text-sm font-medium text-gray-700">Trạng thái thanh toán</label>
                      <select id="is_payment" {...register('is_payment', {setValueAs: (v) => v === 'true'})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
                        <option value="true">Đã thanh toán</option>
                        <option value="false">Chưa thanh toán</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}