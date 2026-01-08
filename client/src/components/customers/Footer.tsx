export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold mb-4">SẢN PHẨM</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Giày</a></li>
              <li><a href="#" className="hover:text-white transition">Quần áo</a></li>
              <li><a href="#" className="hover:text-white transition">Phụ kiện</a></li>
              <li><a href="#" className="hover:text-white transition">Bộ sưu tập mới nhất</a></li>
              <li><a href="#" className="hover:text-white transition">Hàng bán chạy</a></li>
              <li><a href="#" className="hover:text-white transition">Giảm giá</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">THỂ THAO</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Chạy bộ</a></li>
              <li><a href="#" className="hover:text-white transition">Tập gym</a></li>
              <li><a href="#" className="hover:text-white transition">Bóng đá</a></li>
              <li><a href="#" className="hover:text-white transition">Bóng rổ</a></li>
              <li><a href="#" className="hover:text-white transition">Tennis</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">HỖ TRỢ</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Hỗ trợ khách hàng</a></li>
              <li><a href="#" className="hover:text-white transition">Giao hàng</a></li>
              <li><a href="#" className="hover:text-white transition">Trả hàng</a></li>
              <li><a href="#" className="hover:text-white transition">Bảo hành</a></li>
              <li><a href="#" className="hover:text-white transition">Hướng dẫn chọn size</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">VỀ CHÚNG TÔI</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Tin tức</a></li>
              <li><a href="#" className="hover:text-white transition">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-white transition">Nhà đầu tư</a></li>
              <li><a href="#" className="hover:text-white transition">Phát triển bền vững</a></li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold">F</span>
              </div>
              <span className="ml-2 font-bold">FITNESS</span>
            </div>

            <div className="flex gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-white transition">TÌM CỬA HÀNG</a>
              <a href="#" className="hover:text-white transition">TRỞ THÀNH HỘI VIÊN</a>
              <a href="#" className="hover:text-white transition">ĐĂNG KÝ EMAIL</a>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 text-xs text-gray-500">
          <p>Việt Nam</p>
          <p>© 2025 Fitness, Inc. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
