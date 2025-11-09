import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
// import { allProducts, Product } from '../../../db/products';
import { useGetProductCategoryByIdQuery } from '~/services/product-category/productCategories.service';
import { useGetProductQuery } from '~/services/product/product.service';
import { useEffect, useState } from 'react';
import { TProduct } from '~/interfaces/types/product';

export default function ProductCategoryPage() {
  const { id } = useParams<{ id: string }>();
  
  const {data: productData} = useGetProductQuery();
  const {data: category, isLoading} = useGetProductCategoryByIdQuery(id!);

  const [products, setProducts] = useState<TProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(productData?.data && category?.data) {
      const categorized = productData.data
        .filter((product) => product.category_id == id);
      setProducts(categorized);
    }
  }, [productData, category]);

  if (!category && isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold mb-4">Danh mục không tồn tại</h1>
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
          <h1 className="text-4xl font-bold">{category?.data?.name ?? ""}</h1>
          <p className="text-gray-600 mt-2">{products.length ?? 0} sản phẩm</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 pb-6 border-b border-gray-200">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
            <option>Sắp xếp: Phổ biến nhất</option>
            <option>Giá: Thấp đến cao</option>
            <option>Giá: Cao đến thấp</option>
            <option>Mới nhất</option>
          </select>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">Không có sản phẩm trong danh mục này</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2! lg:grid-cols-4! gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: TProduct }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-md hover:bg-gray-50"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-gray-600 transition">
          {product.name}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-1">
          {product.description}
        </p>

        <div className="flex items-baseline gap-2">
          <p className="font-bold text-sm">{product.price}</p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="w-full mt-3 bg-black text-white text-xs font-semibold py-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          XEM CHI TIẾT
        </button>
      </div>
    </div>
  );
}
