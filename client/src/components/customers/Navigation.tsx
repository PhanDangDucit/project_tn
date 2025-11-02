import { Link } from 'react-router-dom';

export function Navigation() {
  const categories = [
    { name: 'PHỤ KIỆN', slug: 'phu-kien' },
    { name: 'NAM', slug: 'nam' },
    { name: 'NỮ', slug: 'nu' },
    { name: 'THỰC PHẨM BỔ SUNG ', slug: 'THUC-PHAM-BO-SUNG' },
    { name: 'BESTSELLER', slug: 'bestseller' },
  ];

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center justify-center gap-8 py-4">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                to={`/category/${category.slug}`}
                className="text-sm font-medium hover:text-gray-600 transition"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}