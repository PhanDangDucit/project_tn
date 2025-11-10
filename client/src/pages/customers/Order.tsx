import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useGetMeQuery } from '~/services/auth/auth.services';
import { useDeleteAllCartDetailMutation, useGetCartDetailByCustomerIdQuery } from '~/services/cart/cart.service';
import { useGetProductQuery } from '~/services/product/product.service';
import { nanoid } from '@reduxjs/toolkit';

export default function Order() {
    const navigate = useNavigate();
    const { data: userData } = useGetMeQuery();
    const { data: cartData } = useGetCartDetailByCustomerIdQuery(userData?.data?.id!);
    const { data: products } = useGetProductQuery();
    const [removeCartDetail] = useDeleteAllCartDetailMutation();

    const cartItems = cartData?.data?.map(cartItem => {
      const productFiltered = products?.data?.find(product => product.id === cartItem.product_id);
      return {
        ...productFiltered,
        ...cartItem
      }
    }) ?? [];

  const formatPrice = (num: number) => {
    return num.toLocaleString('vi-VN');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Tiếp tục mua sắm
          </button>

          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Giỏ hàng của bạn đang trống</h1>
            <p className="text-gray-600 mb-8">Hãy thêm một số sản phẩm để bắt đầu</p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Xem sản phẩm
            </button>
          </div>
        </div>
      </div>
    );
  }
  const total = cartItems?.reduce((sum, item) => {
    const price = item?.price ?? 0;
    const quantity = item?.quantity ?? 0;
    return sum + price * quantity;
  }, 0) ?? 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Tiếp tục mua sắm
        </button>

        <h1 className="text-3xl font-bold mb-8">Thông tin đặt hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3! gap-8">
          <div className='lg:col-span-2'>
            {/* Shipping Information */}
            <div className=''>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-bold mb-4">Thông tin người nhận</h2>
                <div className='flex flex-col gap-4'>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="fullName">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Nhập họ và tên ..."
                      value={userData?.data?.full_name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="address">
                      Địa chỉ (ví dụ: 123 Đường ABC, Quận 1, TP.HCM)
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Nhập địa chỉ ..."
                      value={userData?.data?.address}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phone">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Nhập số điện thoại ..."
                      value={userData?.data?.phone}
                    />
                  </div>
                </div>
              </div>
              {/* Payment Information */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-bold mb-4">Phương thức thanh toán</h2>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm font-medium">Thanh toán khi nhận hàng</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <span className="ml-2 text-sm font-medium">Thanh toán qua thẻ tín dụng</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 h-fit sticky top-20">
              <h2 className="font-bold text-lg mb-6">ĐƠN HÀNG</h2>
  
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span>{formatPrice(total)} đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giảm giá:</span>
                  <span>0 đ</span>
                </div>
              </div>
  
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Tổng cộng:</span>
                <span>{formatPrice(total)} đ</span>
              </div>
  
              <button className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition mb-3">
                ĐẶT HÀNG
              </button>
  
              <button
                onClick={() => navigate('/')}
                className="w-full border border-gray-300 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
              >
                TIẾP TỤC MUA SẮM
              </button>
  
              <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-600 space-y-2">
                <p>✓ Miễn phí vận chuyển cho đơn từ 500.000đ</p>
                <p>✓ Hỗ trợ đổi trả trong 30 ngày</p>
                <p>✓ Bảo hành chính hãng</p>
              </div>
            </div>
          </div>
          {/* Product Items */}
          <div className="lg:col-span-1 space-y-6">
            {cartItems.map((item) => (
              <div key={nanoid()} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="w-24 h-24 shrink-0 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="font-bold text-lg mb-1 cursor-pointer hover:underline"
                    >
                      {item.name}
                    </h3>
                    {/* <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p> */}
                    <p className="font-semibold">Số lượng: {item.quantity}</p>
                    <p className="font-semibold">Thành tiền: {formatPrice((item.price ?? 0) * item.quantity)} đ</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
