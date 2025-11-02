import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, ChevronLeft, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { allProducts } from '../../../db/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = allProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Quay lại
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2! gap-12 mb-16">
          <div className="space-y-4">
            <div className="bg-gray-200 aspect-square rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition">
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold bg-gray-100 px-3 py-1 rounded-full">MỚI</span>
              <h1 className="text-3xl font-bold mt-4 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-bold">{product.price}</p>
            </div>

            <div className="flex gap-4">
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <h3 className="font-bold text-sm mb-4">MÔ TẢ</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {product.features && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm">ĐẶC ĐIỂM NỔI BẬT</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-black">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-sm mb-3">SIZE / LOẠI</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm mb-3">SỐ LƯỢNG</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50 transition"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium min-w-[40px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!selectedSize) {
                  alert('Vui lòng chọn size/loại sản phẩm');
                  return;
                }
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  size: selectedSize,
                  quantity,
                });
                setAddedToCart(true);
                setTimeout(() => setAddedToCart(false), 2000);
              }}
              className={`w-full py-4 rounded-full font-semibold transition flex items-center justify-center gap-2 ${
                addedToCart
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  ĐÃ THÊM VÀO GIỎ
                </>
              ) : (
                'THÊM VÀO GIỎ HÀNG'
              )}
            </button>

            <div className="space-y-2">
              <button className="w-full py-3 text-sm font-medium border-b border-gray-200 flex items-center justify-between hover:text-gray-600 transition">
                <span>HƯỚNG DẪN SỬ DỤNG</span>
                <span>+</span>
              </button>
              <button className="w-full py-3 text-sm font-medium border-b border-gray-200 flex items-center justify-between hover:text-gray-600 transition">
                <span>CHÍNH SÁCH ĐỔI TRẢ</span>
                <span>+</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Sản phẩm tương tự */}
        <div className="border-t border-gray-200 pt-16">
          <div className="mb-8">
            <h2 className="font-bold text-2xl mb-2">SẢN PHẨM TƯƠNG TỰ</h2>
            <p className="text-sm text-gray-600">Khám phá thêm các sản phẩm phù hợp</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4! gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                onClick={() => {
                  navigate(`/product/${relatedProduct.id}`);
                  window.scrollTo(0, 0);
                }}
                className="group cursor-pointer"
              >
                <div className="relative bg-gray-200 aspect-square rounded-lg mb-4 overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <span className="absolute top-3 left-3 text-xs font-semibold bg-white px-2 py-1 rounded">
                    MỚI
                  </span>
                </div>
                <h4 className="font-medium text-sm mb-1">{relatedProduct.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{relatedProduct.description}</p>
                <p className="text-sm font-semibold">{relatedProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
