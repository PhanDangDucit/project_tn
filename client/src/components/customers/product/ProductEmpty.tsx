import { useNavigate } from "react-router-dom";

export default function ProductEmpty() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
            <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
            >
            Quay về trang chủ
            </button>
        </div>
    </div>
  )
}
