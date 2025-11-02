import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ContentGridProps {
  products?: Product[];
}

export default function ContentGrid({ products }: ContentGridProps) {
  const navigate = useNavigate();

  const defaultProducts = [
    { id: 1, name: 'Áo tập GYM nam', description: 'Vải thấm hút mồ hôi tốt', price: '380.000đ', image: 'https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 2, name: 'Quần tập nữ', description: 'Co giãn 4 chiều thoải mái', price: '420.000đ', image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 3, name: 'Giày chạy bộ', description: 'Đế êm, hỗ trợ tốt', price: '1.450.000đ', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 4, name: 'Áo hoodie thể thao', description: 'Giữ ấm, phong cách năng động', price: '650.000đ', image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ];

  const items = products || defaultProducts;

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
          <p className="text-sm font-semibold">{product.price}</p>
        </div>
      ))}
    </div>
  );
}
