import { nanoid } from '@reduxjs/toolkit';
import { RootState } from '~/redux/storage/store';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Toastify } from '~/helpers/Toastify';
import { useAppSelector } from '~/hooks/HookRouter';
import { TCartDetail } from '~/interfaces/types/cart-detail';
import { useDeleteCartDetailMutation, useGetCartDetailByCustomerIdQuery, useUpdateCartDetailMutation } from '~/services/cart/cart.service';
import { useGetProductQuery } from '~/services/product/product.service';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartOverlay({ isOpen, onClose }: CartOverlayProps) {
  const {currentUser: userData} = useAppSelector((state: RootState) => state.auth);
  const { data: cartData } = useGetCartDetailByCustomerIdQuery(userData?.id!);
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

  const navigate = useNavigate();

  const total = cartItems?.reduce((sum, item) => {
    const price = item?.price ?? 0;
    const quantity = item?.quantity ?? 0;
    return sum + price * quantity;
  }, 0) ?? 0;

  // const formatPrice = (num: number) => {
  //   return num.toLocaleString('vi-VN');
  // };

  const handleViewCart = () => {
    navigate('/cart');
    onClose();
  };
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
  function formatPrice(price: string, currency: string) {
    return Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Overlay */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-xl z-50 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-bold text-lg">GIỎ HÀNG</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-240px)] p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-600 mb-4">Giỏ hàng của bạn đang trống</p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/');
                }}
                className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={nanoid()}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex gap-4 mb-4">
                    {/* Product Image */}
                    <div
                      onClick={() => {
                        navigate(`/product/${item?.id}`);
                        onClose();
                      }}
                      className="w-20 h-20 shrink-0 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                    >
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4
                        onClick={() => {
                          navigate(`/product/${item?.id}`);
                          onClose();
                        }}
                        className="font-semibold text-sm mb-1 cursor-pointer hover:underline line-clamp-2"
                      >
                        {item?.name}
                      </h4>
                      {/* <p className="text-xs text-gray-600 mb-2">Size: {item?.size}</p> */}
                      <p className="font-bold text-sm">{formatPrice(String(item?.price) ?? 0, '₫')}</p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeCartDetail(item?.id!)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-2 py-1 w-fit">
                    <button
                      onClick={() => handleDecreaseQuantity(item?.id!, item)}
                      className="p-1 hover:bg-gray-100 rounded transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item?.quantity ?? 1}</span>
                    <button
                      onClick={() => handleInceaseQuantity(item?.id!, item)}
                      className="p-1 hover:bg-gray-100 rounded transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Tổng cộng:</span>
              <span>{formatPrice(String(total) ?? 0, '₫')}</span>
            </div>

            <button
              onClick={handleViewCart}
              className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition mb-2"
            >
              XEM GIỎ HÀNG
            </button>

            <button
              onClick={onClose}
              className="w-full border border-gray-300 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
            >
              TIẾP TỤC MUA SẮM
            </button>
          </div>
        )}
      </div>
    </>
  );
}
