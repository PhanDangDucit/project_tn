import { Link } from 'react-router-dom';
import { useGetProductCategoriesQuery } from '~/services/product-category/productCategories.service';

export function Navigation() {
  const {data: productCategories, isLoading} = useGetProductCategoriesQuery();
  if(!productCategories && isLoading) return null;
  return (
    <nav className="border-b border-gray-200">
      {/*  */}
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center justify-center gap-8 py-4">
          {productCategories?.data?.map((category) => (
            <li key={category.name}>
              <Link
                to={`/category/${category.id}`}
                className="text-sm font-medium hover:text-gray-600 transition"
              >
                {category.name?.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}