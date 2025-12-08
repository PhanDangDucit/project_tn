import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TProduct } from '~/interfaces/types/product';

interface ContentGridProps {
  products?: TProduct[];
}

export default function ContentGrid({ products }: ContentGridProps) {
  const navigate = useNavigate();

  const items = products || [];
  function formatPrice(price: string, currency: string) {
    return Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {items.map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="group cursor-pointer"
        >
          <div className="relative bg-gray-200 aspect-square rounded-lg mb-4 overflow-hidden">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
          <h4 className="font-medium text-sm mb-1">{product.name}</h4>
          <p className="text-xs text-gray-600 mb-2">{product.description}</p>
          <p className="text-sm font-semibold">{formatPrice(String(product?.price) ?? 0, '₫')}</p>
        </div>
      ))}
    </div>
  );
}
