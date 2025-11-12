import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { nanoid } from '@reduxjs/toolkit';
import { useGetOrderByIdQuery } from '~/services/order/order.service';
import { TGetAllOrderDetail } from '~/interfaces/types/order';

export default function OrderDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: orderData, isLoading: isOrderLoading } = useGetOrderByIdQuery(id!);

    const order = orderData?.data;

    const formatPrice = (num: number) => {
        return num.toLocaleString('vi-VN');
    };
    
    if (isOrderLoading) {
        return <div className="text-center py-20">Đang tải chi tiết đơn hàng...</div>;
    }
    
    if (!order) {
        return <div className="text-center py-20">Không tìm thấy đơn hàng.</div>;
    }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/order-history')}
          className="flex items-center gap-2 text-sm hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại lịch sử đơn hàng
        </button>

        <h1 className="text-3xl font-bold mb-8">Chi tiết đơn hàng - #{order.code}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Product Items */}
            {order.order_details?.map((item: TGetAllOrderDetail) => (
              <div key={nanoid()} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div
                    onClick={() => navigate(`/product/${item.product.id}`)}
                    className="w-24 h-24 shrink-0 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3
                      onClick={() => navigate(`/product/${item.product.id}`)}
                      className="font-bold text-lg mb-1 cursor-pointer hover:underline"
                    >
                      {item.product.name}
                    </h3>
                    <p className="font-semibold">Số lượng: {item.quantity}</p>
                    <p className="font-semibold">Giá: {formatPrice(item.price)} đ</p>
                    <p className="font-semibold">Thành tiền: {formatPrice(item.price * item.quantity)} đ</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 h-fit sticky top-20">
            <h2 className="font-bold text-lg mb-6">TÓM TẮT ĐƠN HÀNG</h2>

            <div className="space-y-3 text-sm mb-6">
                <p><strong>Ngày đặt:</strong> {new Date(order.created_at!).toLocaleString('vi-VN')}</p>
                <p><strong>Trạng thái:</strong> {order.order_status}</p>
                <p><strong>Địa chỉ giao hàng:</strong> {order.address}</p>
                <p><strong>Số điện thoại:</strong> {order.phone}</p>
                <p><strong>Phương thức thanh toán:</strong> {order.payment?.name}</p>
                <p><strong>Tình trạng thanh toán:</strong> {order.is_payment ? "Đã thanh toán" : "Chưa thanh toán"}</p>
            </div>

            <div className="space-y-4 mb-6 pb-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tạm tính:</span>
                <span>{formatPrice(order.total)} đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Giảm giá:</span>
                <span>{formatPrice(order.discount || 0)} đ</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Tổng cộng:</span>
              <span>{formatPrice(order.final_total)} đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
