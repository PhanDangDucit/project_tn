import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item?.price!.replace(/\D/g, ''));
    return sum + price * item.quantity;
  }, 0);

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
              <div key={`${item.id}-${item.size}`} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
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
                    <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>
                    <p className="font-semibold">{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2 h-fit">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))
                      }
                      className="p-1 hover:bg-gray-100 rounded transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
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
              THANH TOÁN
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
