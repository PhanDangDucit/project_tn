import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '~/services/product/product.service';

export default function ProductRelated({product}: {product: any}) {
    const navigate = useNavigate();
    const {data: products} = useGetProductQuery();
    
    const relatedProducts = products?.data?.filter(p => p.id !== product.id).slice(0, 8) ?? [];

  return (
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
  )
}
