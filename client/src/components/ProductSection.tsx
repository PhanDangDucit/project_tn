import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TProduct } from '~/interfaces/types/product';

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: TProduct[];
}

export default function ProductSection({ title, subtitle, products }: ProductSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-baseline gap-4 mb-8">
        <h2 className="font-bold text-3xl">{title}</h2>
        <h3 className="font-bold text-3xl">{subtitle}</h3>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group cursor-pointer flex-none w-[280px] snap-start"
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
    </section>
  );
}