import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaClock } from 'react-icons/fa';
import { TPost } from '~/interfaces/types/post';

interface NewsItemProps {
  blog: TPost;
}

export const NewsItem: React.FC<NewsItemProps> = ({ blog }) => {

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg line-clamp-1 font-bold text-primary mb-2  transition-colors">
          {blog.title}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <FaClock className="mr-1" />
          <span>{blog.reading_time} đọc</span>
        </div>
        <div className="text-gray-700 mb-4 line-clamp-2">{blog.content}</div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-gray-600">
            <span className="flex items-center">
              <FaEye className="mr-1" /> {blog.viewCount || 0}
            </span>
          </div>
          <Link
            to={`/news/${blog.id}`}
            className="text-blue-600 font-semibold hover:underline"
          >
            Đọc thêm →
          </Link>
        </div>
      </div>
    </div>
  );
};