import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import LoadingLocal from '~/components/loading/LoadingLocal';
import {
  useGetBlogsQuery,
  // useLikeBlogMutation,
} from '~/services/blog/blog.services';
import { Link } from 'react-router-dom';
import { FaEye, FaClock } from 'react-icons/fa';
// import { useAppSelector } from '~/hooks/HookRouter';
// import { RootState } from '~/redux/storage/store';
import { NewsItem } from './NewItems';
// import { Toastify } from '~/helpers/Toastify';
import { IBlog } from '~/interfaces/types/blog/blog';

const News: React.FC = () => {
  const { data, isLoading, isError } = useGetBlogsQuery();

  const sortedBlogs = data?.data
    ? [...data.data].sort(
        (a: IBlog, b: IBlog) =>
          new Date(b.published_date).getTime() -
          new Date(a.published_date).getTime(),
      )
    : [];

  if (isLoading) return <LoadingLocal />;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">
        Đã xảy ra lỗi khi tải dữ liệu
      </div>
    );
  if (sortedBlogs.length === 0)
    return (
      <div className="text-center py-8 text-gray-500">Không có tin tức nào</div>
    );

  return (
    <div className="font-roboto min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Tin Tức Mới Nhất
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sortedBlogs[0] && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                <div className="relative">
                  <img
                    src={sortedBlogs[0].image}
                    alt={sortedBlogs[0].title}
                    className="w-full h-72 object-cover"
                  />
                  
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-primary mb-3  transition-colors">
                    {sortedBlogs[0].title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span className="mx-2">•</span>
                    <FaClock className="mr-1" />
                    <span>{sortedBlogs[0].reading_time} đọc</span>
                  </div>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {sortedBlogs[0].content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-gray-600">
                      <span className="flex items-center">
                        <FaEye className="mr-1" />{' '}
                        {sortedBlogs[0].viewCount || 0}
                      </span>
                    </div>
                    <Link
                      to={`/news/${sortedBlogs[0]._id}`}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Đọc thêm →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {sortedBlogs.length > 4 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Tin Tức Khác
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedBlogs.slice(4).map((blog) => (
                <NewsItem key={blog._id} blog={blog} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default News;