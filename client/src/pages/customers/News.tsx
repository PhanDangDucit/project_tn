import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailPost from '~/components/customers/posts/detail';
import NewPosts from '~/components/customers/posts/new-posts';
import SimilarPost from '~/components/customers/posts/similar-post';
import { TGetAllPost } from '~/interfaces/types/post';
import { useGetBlogsQuery } from '~/services/blog/blog.services';

export const NewsPage: React.FC = () => {
  const { data: posts, isLoading } = useGetBlogsQuery();
  const { id } = useParams();
  const [post, setPost] = useState<null|TGetAllPost>(null);
  const [similarPosts, setSimilarPosts] = useState<TGetAllPost[]>([]);

  useEffect(() => {
    if(!posts) return;
    const postCurrent = posts?.data?.find(p => Number(p.id!) === Number(id));
    if(!postCurrent) {
      setPost(null);
      return;
    }
    setPost(postCurrent);

    if (postCurrent?.category) {
      const relatedPosts = posts?.data?.filter(
        (p) => p.category_id === postCurrent.category_id && p.id !== postCurrent.id
      ) ?? [];
      setSimilarPosts(relatedPosts);
    }
  }, [posts, id, post]);
 
  return (
    <div className='mx-auto max-w-[1200px] py-20'>
       {
        isLoading ? <div>Đang tải ...</div> :
        <div className='flex gap-6 '>
          {/* left */}
          <div className='w-8/12 flex flex-col gap-16'>
            <DetailPost post={post}/>
            {similarPosts.length > 0 && <SimilarPost posts={similarPosts} />}
          </div>
          {/* right */}
          <div className='w-4/12'>
            {/* New posts */}
            <NewPosts posts={posts?.data ?? []} />
          </div>
        </div>
       }
    </div>
  );
};