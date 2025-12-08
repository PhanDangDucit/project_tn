import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
// import { useCart } from '../../context/CartContext';
import { useGetMeQuery } from '~/services/auth/auth.services';
import { useDeleteCartDetailMutation, useGetCartDetailByCustomerIdQuery, useUpdateCartDetailMutation } from '~/services/cart/cart.service';
import { useGetProductQuery } from '~/services/product/product.service';
import { nanoid } from '@reduxjs/toolkit';
import { Toastify } from '~/helpers/Toastify';
import { TCartDetail } from '~/interfaces/types/cart-detail';

export default function ShoppingCart() {
  const navigate = useNavigate();
  // const { cartItems, removeFromCart, updateQuantity } = useCart();
   const { data: userData } = useGetMeQuery();
    const { data: cartData } = useGetCartDetailByCustomerIdQuery(userData?.data?.id!);
    const { data: products } = useGetProductQuery();
    const [updateCartDetail] = useUpdateCartDetailMutation();
    const [removeCartDetail] = useDeleteCartDetailMutation();
  
    const cartItems = cartData?.data?.map(cartItem => {
      const productFiltered = products?.data?.find(product => product.id === cartItem.product_id);
      return {
        ...productFiltered,
        ...cartItem
      }
    }) ?? [];

  

  // const formatPrice = (num: number) => {
  //   return num.toLocaleString('vi-VN');
  // };
  function formatPrice(price: string, currency: string) {
    return Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
  }

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

  const handleInceaseQuantity = async (id: string, cartDetail: TCartDetail) => {
    try {
      await updateCartDetail({ id, data: { ...cartDetail, quantity: cartDetail.quantity + 1 } }).unwrap();
    } catch (error) {
      Toastify('Cập nhật số lượng thất bại', 400);
    }
  };
  const handleDecreaseQuantity = async (id: string, cartDetail: TCartDetail) => {
    try {
      if(cartDetail.quantity === 1) {
        Toastify('Cập nhật số lượng thất bại', 400);
        return;
      }
      await updateCartDetail({ id, data: { ...cartDetail, quantity: cartDetail.quantity - 1 } }).unwrap();
    } catch (error) {
      Toastify('Cập nhật số lượng thất bại', 400);
    }
  };

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

        <h1 className="text-3xl font-bold mb-8">GIỎ HÀNG</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3! gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
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
                    <p className="font-semibold">{formatPrice(String(item?.price) ?? 0, '₫')}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2 h-fit">
                    <button
                      onClick={() => handleDecreaseQuantity(item?.id!, item)}
                      className="p-1 hover:bg-gray-100 rounded transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleInceaseQuantity(item?.id!, item)}
                      className="p-1 hover:bg-gray-100 rounded transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeCartDetail(item?.id!)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 h-fit sticky top-20">
            <h2 className="font-bold text-lg mb-6">ĐƠN HÀNG</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tạm tính:</span>
                <span>{formatPrice(String(total) ?? 0, '₫')}</span>
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
              <span>{formatPrice(String(total) ?? 0, '₫')}</span>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition mb-3 cursor-pointer" 
              onClick={() => {
                navigate('/order')
                console.log('Đặt hàng');
              }}>
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
      </div>
    </div>
  );
}
