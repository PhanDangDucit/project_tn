import ProductSection from '~/components/ProductSection';
import HeroSlider from '~/components/customers/home/HeroSlider';
import BannerSection from '~/components/BannerSection';
import ContentGrid from '~/components/ContentGrid';
import { RootState } from '~/redux/storage/store';
import { useAppSelector } from '~/hooks/HookRouter';
import { Navigate } from 'react-router-dom';
import { useGetProductQuery } from '~/services/product/product.service';
import { useGetProductCategoriesQuery } from '~/services/product-category/productCategories.service';
import { useEffect, useState } from 'react';
import { TProductCategory } from '~/interfaces/types/product-category';
import { TProduct } from '~/interfaces/types/product';
import { nanoid } from '@reduxjs/toolkit';
import PostSection from '~/components/customers/home/PostSection';

export default function HomePage() {
  const auth = useAppSelector((state: RootState) => state.auth);
  const {data: products} = useGetProductQuery();
  const {data: productCategories} = useGetProductCategoriesQuery();

  const [categorizedProducts, setCategorizedProducts] = useState<
    { category: TProductCategory;
      products: TProduct[] | undefined;
    }[]>([]);

  useEffect(() => {
    if(products?.data && productCategories?.data) {
      const categorized = productCategories.data
            .map((category) => {
              const productsForCategory = products.data?.filter(
                (product) => product.category_id === category.id
              );
              return { category, products: productsForCategory };
            })
            .filter((item) => item?.products!.length > 0);
      setCategorizedProducts(categorized);
    }
  }, [products, productCategories]);

  const bestSellerProducts = products?.data
    ? [...products.data]
        .sort((a, b) => (b.count_sold ?? 0) - (a.count_sold ?? 0))
        .slice(0, 4)
    : [];


  // redirect admin if logged in with admin role
  if (auth.loggedIn && auth.accessToken) {
    switch (auth.role) {
      case 'admin':
        return <Navigate to="/admin" />;
    }
  }

  return (
    <>
      <HeroSlider />
      <section className="max-w-7xl mx-auto px-4 py-16 pb-0">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-bold text-2xl">BESTSELLER</h2>
          <button className="px-4 py-1 bg-black text-white rounded-full text-sm">
            Tất Cả
          </button>
          <button className="px-4 py-1 text-sm hover:bg-gray-100 rounded-full">
            MỚI
          </button>
        </div>
        <ContentGrid products={bestSellerProducts} />
      </section>

      <BannerSection
        title="NÂNG TẦM THỂ LỰC"
        subtitle="Thiết bị chất lượng cao cho mọi mục tiêu tập luyện"
        image="https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=1920"
        buttonText="Khám phá ngay"
      />

      {categorizedProducts.map(({ category, products }) => (
        <ProductSection
          key={category.id}
          title={category.name!}
          subtitle="TẤT CẢ"
          products={products ?? []}
        />
      ))}

      <BannerSection
        title="CHINH PHỤC GIỚI HẠN"
        subtitle="Dụng cụ tập luyện chất lượng cao cho vận động viên"
        image="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1920"
        buttonText="Xem thêm"
      />

      <PostSection/>

      {/* <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-bold text-2xl">DANH MỤC SẢN PHẨM</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {
            productCategories?.data?.map((category) => (
              <div className="relative bg-gray-200 aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer" key={nanoid()}>
                <img
                  src="https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Bình nước"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
                  <span className="font-bold text-3xl text-white">{category.name}</span>
                </div>
              </div>
            ))
          }
        </div>
      </section> */}
    </>
  );
}