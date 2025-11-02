import React from 'react';
import Header from '../../components/customers/Header';
import Footer from '../../components/customers/Footer';
import LoadingLocal from '~/components/loading/LoadingLocal';
import {
  useGetBlogsQuery
} from '~/services/blog/blog.services';
import { Link } from 'react-router-dom';
import { FaEye, FaClock } from 'react-icons/fa';
import { NewsItem } from './NewItems';
import { TPost } from '~/interfaces/types/post';

export const NewsPage: React.FC = () => {
  // const { data, isLoading, isError } = useGetBlogsQuery();

  // const sortedBlogs = data?.data
  //   ? [...data.data].sort(
  //       (a: TPost, b: TPost) =>
  //         new Date(b.published_date).getTime() -
  //         new Date(a.published_date).getTime(),
  //     )
  //   : [];

  // if (isLoading) return <LoadingLocal />;
  // if (isError)
  //   return (
  //     <div className="text-center py-8 text-red-500">
  //       Đã xảy ra lỗi khi tải dữ liệu
  //     </div>
  //   );
  // if (sortedBlogs.length === 0)
  //   return (
  //     <div className="text-center py-8 text-gray-500">Không có tin tức nào</div>
  //   );

  return (
    // <div className="font-roboto min-h-screen">
    //   <div className="container mx-auto px-4 py-12">
    //     <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
    //       Tin Tức Mới Nhất
    //     </h1>

    //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    //       {sortedBlogs[0] && (
    //         <div className="lg:col-span-2">
    //           <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
    //             <div className="relative">
    //               <img
    //                 src={sortedBlogs[0].image}
    //                 alt={sortedBlogs[0].title}
    //                 className="w-full h-72 object-cover"
    //               />
                  
    //             </div>
    //             <div className="p-6">
    //               <h2 className="text-2xl font-bold text-primary mb-3  transition-colors">
    //                 {sortedBlogs[0].title}
    //               </h2>
    //               <div className="flex items-center text-sm text-gray-600 mb-4">
    //                 <span className="mx-2">•</span>
    //                 <FaClock className="mr-1" />
    //                 <span>{sortedBlogs[0].reading_time} đọc</span>
    //               </div>
    //               <p className="text-gray-600 line-clamp-3 mb-4">
    //                 {sortedBlogs[0].content}
    //               </p>
    //               <div className="flex items-center justify-between">
    //                 <div className="flex gap-4 text-gray-600">
    //                   <span className="flex items-center">
    //                     <FaEye className="mr-1" />{' '}
    //                     {sortedBlogs[0].viewCount || 0}
    //                   </span>
    //                 </div>
    //                 <Link
    //                   to={`/news/${sortedBlogs[0].id}`}
    //                   className="text-blue-600 font-semibold hover:underline"
    //                 >
    //                   Đọc thêm →
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //     </div>

    //     {sortedBlogs.length > 4 && (
    //       <div className="mt-12">
    //         <h2 className="text-2xl font-bold mb-6 text-gray-800">
    //           Tin Tức Khác
    //         </h2>
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //           {sortedBlogs.slice(4).map((blog) => (
    //             <NewsItem key={blog.id} blog={blog} />
    //           ))}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className='flex gap-6 mx-auto max-w-[1200px] py-20'>
      {/* left */}
      <div className='w-8/12 flex flex-col gap-16'>
        {/* Detail */}
        <div>
          <div className=''>
            <h2 className='font-bold text-xl'>Sức khỏe</h2>
            <div className='flex justify-between'>
              <p>1 ngày trước</p>
              <p className='flex gap-4 items-center'><FaEye/> <p className=''>12</p></p>
            </div>
          </div>
          <div className='mt-6 flex flex-col gap-6'>
            <h1 className='font-bold text-3xl'>Tập gym có tác dụng gì? 10 lợi ích tuyệt vời khiến bạn muốn tập ngay</h1>
            <p className=''>
              Tập gym mang đến nhiều lợi ích cho sức khỏe và hình thể, nhưng bạn có biết cụ thể tập gym có tác dụng gì không? Bài viết sẽ mang đến 10 lợi ích khi tập gym và những lưu ý an toàn ở phòng tập gym.
            </p>
            <img src="https://cdn.centr.com/content/34000/33578/images/landscapedesktop2x-centr-ingrid-169.jpg" alt="thumbnail" />
            <p>Dù tập thể dục ở nhà hay ở phòng tập gym, bạn đều nhận được những tác động tích cực đối với sức khỏe. Tuy nhiên, tập luyện ở phòng gym thường mang đến cho bạn sự tiện nghi và động lực luyện tập lớn hơn.</p>
            <p>Lợi ích đầu tiên khi đi tập gym và cũng là mong muốn của nhiều người khi đi tập gym đó là xây dựng một vóc dáng đẹp. Tập gym đúng cách, đúng kỹ thuật với tần suất phù hợp sẽ giúm bạn giảm cân lành mạnh, cơ bắp săn chắc và trông khỏe khoắn hơn.</p>
          </div>
        </div>
       
        {/* Similar post */}
        <div className='flex flex-col gap-8'>
          <h3 className='font-bold text-3xl'>Bài viết tương tự</h3>
          <div className='flex gap-4'>
            {/* Item 1 */}
            <div className='w-1/3'>
              <img src="https://cdn.centr.com/content/34000/33578/images/landscapedesktop2x-centr-ingrid-169.jpg" alt="" />
              <div>
                <div className='flex justify-between'>
                  <p>1 ngày trước</p>
                  <p>12 views</p>
                </div>
                <p className='font-medium text-base'>Tập gym có tác dụng gì? 10 lợi ích tuyệt vời khiến bạn muốn tập ngay</p>
                <p className='line-clamp-3'>Tập gym mang đến nhiều lợi ích cho sức khỏe và hình thể, nhưng bạn có biết cụ thể tập gym có tác dụng gì không? Bài viết sẽ mang đến 10 lợi ích khi tập gym và những lưu ý an ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className='w-4/12'>
         {/* New posts */}
        <div>
          <h3 className='font-bold text-3xl'>Bài viết mới nhất</h3>
          <div className=''>
            {/* item 1 */}
            <div className=''>
              <img src="https://cdn.centr.com/content/34000/33578/images/landscapedesktop2x-centr-ingrid-169.jpg" alt="" />
              <div>
                  <div className='flex justify-between'>
                    <p>1 ngày trước</p>
                    <p>12 views</p>
                  </div>
                  <p className='font-medium text-base'>Tập gym có tác dụng gì? 10 lợi ích tuyệt vời khiến bạn muốn tập ngay</p>
                  <p className='line-clamp-3'>Tập gym mang đến nhiều lợi ích cho sức khỏe và hình thể, nhưng bạn có biết cụ thể tập gym có tác dụng gì không? Bài viết sẽ mang đến 10 lợi ích khi tập gym và những lưu ý an ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
