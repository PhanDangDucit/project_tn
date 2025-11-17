import { FaEye } from "react-icons/fa";
import { TGetAllPost } from "~/interfaces/types/post";

export default function DetailPost({post}: {post: TGetAllPost | null}) {
  return (
    <div>
        <div className=''>
        <h2 className='font-bold text-xl'>{post?.category.name ?? ""}</h2>
        <div className='flex justify-between'>
            <p>1 ngày trước</p>
            <p className='flex gap-4 items-center'><FaEye/> <p className=''>{post?.view_count ?? 0}</p></p>
        </div>
        </div>
        <div className='mt-6 flex flex-col gap-6'>
        <h1 className='font-bold text-3xl'>{post?.title ?? ""}</h1>
        <p className=''>
            {post?.description ?? ""}
        </p>
        <img src={post?.thumbnail ?? "https://cdn.centr.com/content/34000/33578/images/landscapedesktop2x-centr-ingrid-169.jpg"} alt="thumbnail" />
        <p>{post?.content ?? ""}</p>
        </div>
    </div>
  )
}
