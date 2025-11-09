import ProductSection from '~/components/ProductSection';
import HeroSlider from '~/components/customers/home/HeroSlider';
import BannerSection from '~/components/BannerSection';
import ContentGrid from '~/components/ContentGrid';
import { RootState } from '~/redux/storage/store';
import { useAppSelector } from '~/hooks/HookRouter';
import { Navigate } from 'react-router-dom';

export default function HomePage() {
  const auth = useAppSelector((state: RootState) => state.auth);
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
        <ContentGrid />
      </section>

      <BannerSection
        title="NÂNG TẦM THỂ LỰC"
        subtitle="Thiết bị chất lượng cao cho mọi mục tiêu tập luyện"
        image="https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=1920"
        buttonText="Khám phá ngay"
      />


      <ProductSection
        title="NAM"
        subtitle="TẤT CẢ"
        products={[
          { id: 1, name: 'Dây kéo cơ thép', description: 'Chất liệu thép bền bỉ', price: '450.000đ', image: 'https://img.lazcdn.com/g/p/ff40dc5b0a8459296d3abcac7dab784b.jpg_720x720q80.jpg' },
          { id: 2, name: 'Găng tay GYM', description: 'Chống trơn, bảo vệ tay', price: '250.000đ', image: 'https://img.lazcdn.com/g/p/ff40dc5b0a8459296d3abcac7dab784b.jpg_720x720q80.jpg' },
          { id: 3, name: 'Dây cáp thép', description: 'Mạnh mẽ, đa năng', price: '380.000đ', image: 'https://img.lazcdn.com/g/p/ff40dc5b0a8459296d3abcac7dab784b.jpg_720x720q80.jpg' },
          { id: 4, name: 'Dây thun tập lưng', description: 'Đàn hồi cao, bền', price: '320.000đ', image: 'https://img.lazcdn.com/g/p/ff40dc5b0a8459296d3abcac7dab784b.jpg_720x720q80.jpg' },
          { id: 9, name: 'Thảm tập Yoga', description: 'Chống trơn, êm ái', price: '380.000đ', image: 'https://img.lazcdn.com/g/p/ff40dc5b0a8459296d3abcac7dab784b.jpg_720x720q80.jpg' },
          { id: 10, name: 'Bóng tập thể dục', description: 'Size 65cm, chống nổ', price: '420.000đ', image: 'https://img.lazcdn.com/g/p/ff40dc5b0a8459296d3abcac7dab784b.jpg_720x720q80.jpg' },
          { id: 11, name: 'Bình nước Gym', description: 'Dung tích 1L, không BPA', price: '150.000đ', image: 'https://img.lazcdn.com/g/p/ff40dc5b0a8459296d3abcac7dab784b.jpg_720x720q80.jpg' },
          { id: 12, name: 'Đai lưng tập gym', description: 'Hỗ trợ lưng tốt', price: '550.000đ', image: 'https://img.lazcdn.com/g/p/ff40dc5b0a8459296d3abcac7dab784b.jpg_720x720q80.jpg' },
        ]}
      />

      <ProductSection
        title="NỮ"
        subtitle="TẤT CẢ"
        products={[
          { id: 5, name: 'Dây kéo co giãn', description: 'Đa cấp độ kháng lực', price: '420.000đ', image: 'https://images-cdn.ubuy.com.sa/64f5676d3fbc546ab338d709-gymshark-fraction-womens-fitness.jpg' },
          { id: 6, name: 'Bộ tạ điều chỉnh', description: 'Từ 2.5kg - 24kg', price: '1.250.000đ', image: 'https://images-cdn.ubuy.com.sa/64f5676d3fbc546ab338d709-gymshark-fraction-womens-fitness.jpg' },
          { id: 7, name: 'Dây kháng lực', description: 'Phù hợp mọi cấp độ', price: '290.000đ', image: 'https://images-cdn.ubuy.com.sa/64f5676d3fbc546ab338d709-gymshark-fraction-womens-fitness.jpg' },
          { id: 8, name: 'Dây thun tập vai', description: 'Tăng cường cơ vai', price: '350.000đ', image: 'https://images-cdn.ubuy.com.sa/64f5676d3fbc546ab338d709-gymshark-fraction-womens-fitness.jpg' },
          { id: 13, name: 'Tạ tay 5kg', description: 'Bọc cao su chống trơn', price: '480.000đ', image: 'https://images-cdn.ubuy.com.sa/64f5676d3fbc546ab338d709-gymshark-fraction-womens-fitness.jpg' },
          { id: 14, name: 'Dây nhảy thể dục', description: 'Nhẹ, xoay trơn tru', price: '180.000đ', image: 'https://images-cdn.ubuy.com.sa/64f5676d3fbc546ab338d709-gymshark-fraction-womens-fitness.jpg' },
          { id: 15, name: 'Băng quấn tay', description: 'Hấp thụ mồ hôi tốt', price: '120.000đ', image: 'https://images-cdn.ubuy.com.sa/64f5676d3fbc546ab338d709-gymshark-fraction-womens-fitness.jpg' },
          { id: 16, name: 'Xà đơn treo tường', description: 'Chịu lực 150kg', price: '680.000đ', image: 'https://images-cdn.ubuy.com.sa/64f5676d3fbc546ab338d709-gymshark-fraction-womens-fitness.jpg' },
        ]}
      />

      <BannerSection
        title="CHINH PHỤC GIỚI HẠN"
        subtitle="Dụng cụ tập luyện chất lượng cao cho vận động viên"
        image="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1920"
        buttonText="Xem thêm"
      />

      <ProductSection
        title="PHỤ KIỆN"
        subtitle="TẤT CẢ"
        products={[
          { id: 1, name: 'Dây kéo cơ thép', description: 'Chất liệu thép bền bỉ', price: '450.000đ', image: 'https://chogym.vn/wp-content/uploads/2018/12/tui-trong-the-thao-gymshark-tap-gym-16.jpg' },
          { id: 2, name: 'Găng tay GYM', description: 'Chống trơn, bảo vệ tay', price: '250.000đ', image: 'https://chogym.vn/wp-content/uploads/2018/12/tui-trong-the-thao-gymshark-tap-gym-16.jpg' },
          { id: 3, name: 'Dây cáp thép', description: 'Mạnh mẽ, đa năng', price: '380.000đ', image: 'https://chogym.vn/wp-content/uploads/2018/12/tui-trong-the-thao-gymshark-tap-gym-16.jpg' },
          { id: 4, name: 'Dây thun tập lưng', description: 'Đàn hồi cao, bền', price: '320.000đ', image: 'https://chogym.vn/wp-content/uploads/2018/12/tui-trong-the-thao-gymshark-tap-gym-16.jpg' },
          { id: 9, name: 'Thảm tập Yoga', description: 'Chống trơn, êm ái', price: '380.000đ', image: 'https://chogym.vn/wp-content/uploads/2018/12/tui-trong-the-thao-gymshark-tap-gym-16.jpg' },
          { id: 10, name: 'Bóng tập thể dục', description: 'Size 65cm, chống nổ', price: '420.000đ', image: 'https://chogym.vn/wp-content/uploads/2018/12/tui-trong-the-thao-gymshark-tap-gym-16.jpg' },
          { id: 11, name: 'Bình nước Gym', description: 'Dung tích 1L, không BPA', price: '150.000đ', image: 'https://chogym.vn/wp-content/uploads/2018/12/tui-trong-the-thao-gymshark-tap-gym-16.jpg' },
          { id: 12, name: 'Đai lưng tập gym', description: 'Hỗ trợ lưng tốt', price: '550.000đ', image: 'https://chogym.vn/wp-content/uploads/2018/12/tui-trong-the-thao-gymshark-tap-gym-16.jpg' },
        ]}
      />

      <ProductSection
        title="THỰC PHẨN BỔ SUNG"
        subtitle="TẤT CẢ"
        products={[
          { id: 5, name: 'Dây kéo co giãn', description: 'Đa cấp độ kháng lực', price: '420.000đ', image: 'https://product.hstatic.net/1000026167/product/on_hydro_choco_8cd5e687ea2e426ba27340bed35073a6_medium.png' },
          { id: 6, name: 'Bộ tạ điều chỉnh', description: 'Từ 2.5kg - 24kg', price: '1.250.000đ', image: 'https://product.hstatic.net/1000026167/product/on_hydro_choco_8cd5e687ea2e426ba27340bed35073a6_medium.png' },
          { id: 7, name: 'Dây kháng lực', description: 'Phù hợp mọi cấp độ', price: '290.000đ', image: 'https://product.hstatic.net/1000026167/product/on_hydro_choco_8cd5e687ea2e426ba27340bed35073a6_medium.png' },
          { id: 8, name: 'Dây thun tập vai', description: 'Tăng cường cơ vai', price: '350.000đ', image: 'https://product.hstatic.net/1000026167/product/on_hydro_choco_8cd5e687ea2e426ba27340bed35073a6_medium.png' },
          { id: 13, name: 'Tạ tay 5kg', description: 'Bọc cao su chống trơn', price: '480.000đ', image: 'https://product.hstatic.net/1000026167/product/on_hydro_choco_8cd5e687ea2e426ba27340bed35073a6_medium.png' },
          { id: 14, name: 'Dây nhảy thể dục', description: 'Nhẹ, xoay trơn tru', price: '180.000đ', image: 'https://product.hstatic.net/1000026167/product/on_hydro_choco_8cd5e687ea2e426ba27340bed35073a6_medium.png' },
          { id: 15, name: 'Băng quấn tay', description: 'Hấp thụ mồ hôi tốt', price: '120.000đ', image: 'https://product.hstatic.net/1000026167/product/on_hydro_choco_8cd5e687ea2e426ba27340bed35073a6_medium.png' },
          { id: 16, name: 'Xà đơn treo tường', description: 'Chịu lực 150kg', price: '680.000đ', image: 'https://product.hstatic.net/1000026167/product/on_hydro_choco_8cd5e687ea2e426ba27340bed35073a6_medium.png' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-bold text-2xl">DANH MỤC SẢN PHẨM</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="relative bg-gray-200 aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
            <img
              src="https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Bình nước"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
              <span className="font-bold text-3xl text-white">THỜI TRANG</span>
            </div>
          </div>
          <div className="relative bg-gray-200 aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
            <img
              src="https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Whey Protein"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
              <span className="font-bold text-3xl text-white">WHEY PROTEIN</span>
            </div>
          </div>
          <div className="relative bg-gray-200 aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
            <img
              src="https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Phụ kiện tập"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
              <span className="font-bold text-3xl text-white">PHỤ KIỆN TẬP</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}