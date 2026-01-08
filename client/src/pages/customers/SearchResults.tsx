import { useNavigate, useSearchParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useGetProductSearchQuery } from '~/services/product/product.service';
import { TProduct } from '~/interfaces/types/product';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const { data: productData, isLoading } = useGetProductSearchQuery(
    keyword ? keyword : undefined
  );

  const products = productData?.data ?? [];
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold mb-4">Đang tìm kiếm...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Kết quả tìm kiếm: "{keyword}"</h1>
          <p className="text-gray-600 mt-2">{products.length ?? 0} sản phẩm</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">Không có kết quả phù hợp</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
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
      <div className="relative w-full aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-md hover:bg-gray-50"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-gray-600 transition">
          {product.name}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-1">{product.description}</p>

        <div className="flex items-baseline gap-2">
          <p className="font-bold text-sm">{product.price}</p>
        </div>

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
