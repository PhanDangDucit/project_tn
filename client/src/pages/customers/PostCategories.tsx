import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TPost } from "~/interfaces/types/post";
import { TPostCategory } from "~/interfaces/types/post-category";
import { useGetBlogsQuery } from "~/services/blog/blog.services";
import { useGetPostCategoriesQuery } from "~/services/post-category/post-category.service";

export const PostCategoriesPage: React.FC = () => {

   const {data: posts} = useGetBlogsQuery();
    const {data: postCategories} = useGetPostCategoriesQuery();
  
    const [categorizedPosts, setCategorizedPosts] = useState<
      { category: TPostCategory;
        posts: TPost[] | undefined;
      }[]>([]);
  
    useEffect(() => {
      if(posts?.data && postCategories?.data) {
        const categorized = postCategories.data
              .map((category) => {
                const postsForCategory = posts.data?.filter(
                  (post) => post.category_id === category.id
                );
                return { category, posts: postsForCategory };
              })
              .filter((item) => item?.posts!.length > 0);
        setCategorizedPosts(categorized);
      }
    }, [posts, postCategories]);

  return (
    <div className='flex gap-6 mx-auto max-w-[1200px] py-20 min-h-screen'>
        {/* Category A */}
        <div className='flex flex-col gap-8'>
          {
            categorizedPosts.map((categoryItem) => (
              <div key={nanoid()} className="flex flex-col gap-8">
                <h3 className='font-bold text-3xl'>{categoryItem.category.name?.toLocaleUpperCase() ?? ""}</h3>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    categoryItem?.posts?.map((post) => (
                      <div key={nanoid()} className="relative flex flex-col gap-4">
                        <img src={post.thumbnail}
                          alt={post.title ?? "thumbnail post"} 
                          width="100%"
                          height="400px" 
                          className="object-cover h-[423px] w-full"
                        />
                        <div>
                          <div className='flex justify-between'>
                            <p>1 ngày trước</p>
                            <p>{post.view_count ?? 0} views</p>
                          </div>
                          <p className='font-medium text-base'>{post.title ?? ""}</p>
                          <p className='line-clamp-3'>{post.description ?? ""}</p>
                        </div>
                        <Link to={`/posts/${post.id}`} className="inset-0 absolute"></Link>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
    </div>
  );
};
