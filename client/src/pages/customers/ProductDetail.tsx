import { useParams, useNavigate } from 'react-router-dom';
import { Share2, ChevronLeft, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductEmpty from '~/components/customers/product/ProductEmpty';
import { useAppSelector } from '~/hooks/HookRouter';
import { RootState } from '~/redux/storage/store';
import { Toastify } from '~/helpers/Toastify';
import ProductRelated from '~/components/customers/product/ProductRelated';
import { useGetProductQuery } from '~/services/product/product.service';
import { TProduct } from '~/interfaces/types/product';
import { useGetProductCategoriesQuery } from '~/services/product-category/productCategories.service';
import { useCreateCartDetailMutation } from '~/services/cart/cart.service';

export default function ProductDetail() {
  const auth = useAppSelector((state: RootState) => state.auth);
  const {currentUser: userData} = useAppSelector((state: RootState) => state.auth);  
  const { id } = useParams();
  const navigate = useNavigate();
  // const { addToCart } = useCart();
  const [addProductToCart] =
    useCreateCartDetailMutation();
  // const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const {data: productData} = useGetProductQuery();
  const {data: productCategories} = useGetProductCategoriesQuery();
  
  const [category, setCategory] = useState<string>('');

  const [product, setProduct] = useState<TProduct|null>(null);
  function formatPrice(price: string, currency: string) {
    return Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
  }

  useEffect(() => {
    if(!productData) return;
    const product = productData?.data?.find(p => Number(p.id!) === Number(id));
    if(!product) {
      setProduct(null);
      return;
    }
    setProduct(product);
  }, [productData, id]);

  useEffect(() => {
    if(product) {
      const categoryOfProduct = productCategories?.data?.find(cat => cat.id === product.category_id);
      setCategory(categoryOfProduct?.name!);
    }
  }, [product, productCategories]);

  // const formatPrice = (num: number) => {
  //   return num.toLocaleString('vi-VN');
  // };

  const handleAddToCart = async() => {
    if(!auth.loggedIn) {
      Toastify('Vui lòng đăng nhập để tiếp tục', 400);
      navigate('/login');
      return;
    }
    console.log('Adding to cart', {
      product_id: product?.id!,
      quantity,
      customer_id: userData?.id!,
    });
    try {
      await addProductToCart({
        product_id: product?.id!,
        quantity,
        customer_id: userData?.id!,
      }).unwrap();
      setAddedToCart(true);
    } catch (error) {
      Toastify('Thêm sản phẩm vào giỏ hàng thất bại', 400);
      return;
    }
    Toastify('Thêm sản phẩm vào giỏ hàng thành công', 201);

    setTimeout(() => setAddedToCart(false), 2000);
  }

  if (!product) {
    return (
      <ProductEmpty/>
    );
  }

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
            
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold bg-gray-100 px-3 py-1 rounded-full">MỚI</span>
              <h1 className="text-3xl font-bold mt-4 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-600 mb-4">{category ?? ""}</p>
              <p className="text-2xl font-bold">{formatPrice(String(product?.price) ?? 0, '₫')}</p>
            </div>

            <div className="flex gap-4">
              {/* <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                <Heart className="w-5 h-5" />
              </button> */}
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <h3 className="font-bold text-sm mb-4">MÔ TẢ</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              {/* <div>
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
              </div> */}

              <div>
                <h3 className="font-bold text-sm mb-3">SỐ LƯỢNG</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50 transition"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium min-w-10 text-center">{quantity}</span>
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
              onClick={() => handleAddToCart()}
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

            {/* <div className="space-y-2">
              <button className="w-full py-3 text-sm font-medium border-b border-gray-200 flex items-center justify-between hover:text-gray-600 transition">
                <span>HƯỚNG DẪN SỬ DỤNG</span>
                <span>+</span>
              </button>
              <button className="w-full py-3 text-sm font-medium border-b border-gray-200 flex items-center justify-between hover:text-gray-600 transition">
                <span>CHÍNH SÁCH ĐỔI TRẢ</span>
                <span>+</span>
              </button>
            </div> */}
          </div>
        </div>
        
        {/* Sản phẩm tương tự */}
        <ProductRelated product={product} />
      </div>
    </div>
  );
}
