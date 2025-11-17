import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { TPost } from "~/interfaces/types/post";

export default function NewPosts({posts}: {posts: TPost[]}) {

  return (
    <div className="flex flex-col gap-8">
        <h3 className='font-bold text-3xl'>Bài viết mới nhất</h3>
        <div className='flex flex-col gap-6'>
          {
            posts.map((post: TPost) => (
              <div className='relative cursor-pointer' key={nanoid()}>
                <img src={post.thumbnail ?? "https://cdn.centr.com/content/34000/33578/images/landscapedesktop2x-centr-ingrid-169.jpg"} alt="" />
                <div className="flex flex-col gap-4">
                  <div className='flex justify-between'>
                  <p>1 ngày trước</p>
                  <p>{post.view_count ?? 0}</p>
                  </div>
                  <p className='font-medium text-base'>{post.title ?? ""}</p>
                  <p className='line-clamp-3'>{post.description ?? ""}</p>
                  <Link to={`/posts/${post.id}`} className="absolute inset-0"/>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}
