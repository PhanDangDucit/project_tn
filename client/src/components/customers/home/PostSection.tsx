import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetBlogsQuery } from '~/services/blog/blog.services';

export default function PostSection() {
  const {data: posts} = useGetBlogsQuery();

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-baseline gap-4 mb-8">
        <h2 className="font-bold text-3xl">Bài viết mới nhất</h2>
      </div>
      <div
          className="flex gap-6 overflow-x-auto"
        >
          {posts?.data?.map((post) => (
            <div
              key={post.id}
              className="group cursor-pointer flex-none w-[280px] snap-start relative"
            >
              <div className="relative bg-gray-200 aspect-square rounded-lg mb-4 overflow-hidden">
                {post.thumbnail && (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <h4 className="font-medium text-sm mb-1">{post.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{post.description}</p>
              <Link to={`/posts/${post.id}`} className="absolute inset-0"></Link>
            </div>
          ))}
        </div>
    </section>
  )
}