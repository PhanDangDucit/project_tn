
export const PostCategoriesPage: React.FC = () => {
  return (
    <div className='flex gap-6 mx-auto max-w-[1200px] py-20'>
        {/* Category A */}
        <div className='flex flex-col gap-6'>
          <h3 className='font-bold text-3xl'>Sức khỏe</h3>
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
  );
};
