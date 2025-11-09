import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Toastify } from '~/helpers/Toastify';
import { TPost } from '~/interfaces/types/post';
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from '~/services/blog/blog.services';
import { useGetPostCategoriesQuery } from '~/services/post-category/post-category.service';

export function PostManager() {
  const { data: posts, isLoading, refetch } = useGetBlogsQuery();
  const { data: categories } = useGetPostCategoriesQuery();
  const [createPost] = useCreateBlogMutation();
  const [updatePost] = useUpdateBlogMutation();
  const [deletePost] = useDeleteBlogMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TPost>();

  const handleEditClick = (post: TPost) => {
    setSelectedPost(post);
    setValue('title', post.title);
    setValue('description', post.description);
    setValue('content', post.content);
    setValue('thumbnail', post.thumbnail);
    setValue('category_id', post.category_id);
    setShowModal(true);
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      try {
        await deletePost(id).unwrap();
        Toastify('Xóa bài viết thành công', 201);
        refetch();
      } catch (error) {
        const errorMessage =
          (error as { data?: { message?: string } })?.data?.message || 'Đã có lỗi xảy ra!';
        Toastify(errorMessage, 400);
      }
    }
  };

  const onSubmit = async (data: TPost) => {
    try {
      if (selectedPost) {
        await updatePost({ id: selectedPost.id!, data }).unwrap();
        Toastify('Cập nhật bài viết thành công', 201);
      } else {
        await createPost(data).unwrap();
        Toastify('Thêm bài viết thành công', 201);
      }
      reset();
      setShowModal(false);
      refetch();
    } catch (error) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message || 'Đã có lỗi xảy ra!';
      Toastify(errorMessage, 400);
    }
  };

  const handleClickAddPost = () => {
    setSelectedPost(null);
    reset();
    setShowModal(true);
  };

  return (
    <div className="px-20 py-10">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Bài viết</h1>
        <Button onClick={handleClickAddPost} className="flex items-center space-x-2 bg-black text-white px-3 rounded-2xl">
          <FaPlus />
          <span>Thêm bài viết</span>
        </Button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="text-center text-gray-500">Đang tải...</div>
        ) : (
          <>
            {!posts?.data?.length ? (
              <div className="col-span-full text-center text-gray-500">Không có bài viết nào!</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Thumbnail</th>
                    <th>Tên</th>
                    <th>Danh mục</th>
                    <th>Lượt xem</th>
                    <th>Thời gian tạo</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {posts?.data?.map((post: TPost) => (
                    <tr key={post.id} className="text-center">
                      <td>{post.id}</td>
                      <td className="flex justify-center">
                        <img
                          src={post.thumbnail ?? 'https://via.placeholder.com/80'}
                          alt={post.title}
                          className="w-20 h-20 object-cover"
                        />
                      </td>
                      <td>{post.title}</td>
                      <td>{categories?.data?.find(c => c.id === post.category_id)?.name || 'N/A'}</td>
                      <td>{post.view_count ?? 0}</td>
                      <td>{new Date(post.created_at!).toLocaleString('vi-VN')}</td>
                      <td className="px-4 py-3 flex items-center justify-center space-x-2 mt-2">
                        <button
                          onClick={() => handleDeletePost(post.id!)}
                          className="bg-red-600 text-white px-3 py-1 rounded flex items-center"
                        >
                          <FaTrash className="mr-1" /> Xóa
                        </button>
                        <button
                          onClick={() => handleEditClick(post)}
                          className="bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                        >
                          <FaEdit className="mr-1" /> Sửa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
        {/* popup modal */}
        <div>
            <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                    {selectedPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết'}
                                    </DialogTitle>

                                    {/* Tên */}
                                    <div className="mt-2">
                                        <label className="label">Tên bài viết </label>
                                        <input
                                            {...register('title', {
                                                required: 'Tên bài viết là bắt buộc',
                                            })}
                                            type="text"
                                            placeholder="Nhập tên bài viết"
                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        />
                                        {errors.title && (
                                            <p className="text-red-500 text-sm ">{errors.title.message}</p>
                                        )}
                                    </div>

                                    {/* danh mục */}
                                    <div className="mt-2">
                                        <label className="label">Danh mục bài viết </label>
                                        <select
                                            {...register('category_id', {
                                                required: 'Danh mục bài viết là bắt buộc',
                                            })}
                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        >
                                            <option value="">Chọn danh mục</option>
                                            {categories?.data?.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        
                                        {errors.category_id && (
                                            <p className="text-red-500 text-sm ">{errors.category_id.message}</p>
                                        )}
                                    </div>
                                    {/* Mô tả */}
                                    <div className="mt-2">
                                        <label className="label">Mô tả bài viết </label>
                                        <textarea
                                            {...register('description')}
                                            placeholder="Nhập mô tả bài viết"
                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        />
                                        {errors.description && (
                                            <p className="text-red-500 text-sm ">{errors.description.message}</p>
                                        )}
                                    </div>
                                    {/* Nội dung */}
                                    <div className="mt-2">
                                        <label className="label">Nội dung bài viết </label>
                                        <textarea
                                            {...register('content')}
                                            placeholder="Nhập nội dung bài viết"
                                            rows={6}
                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        />
                                        {errors.content && (
                                            <p className="text-red-500 text-sm ">{errors.content.message}</p>
                                        )}
                                    </div>
                                    {/* Image */}
                                    <div className="mt-2">
                                        <label className="label">Hình ảnh bài viết </label>
                                        <input
                                            {...register('thumbnail')}
                                            type="text"
                                            placeholder="Nhập hình ảnh bài viết"
                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        />
                                        {errors.thumbnail && (
                                            <p className="text-red-500 text-sm ">{errors.thumbnail.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                {selectedPost ? 'Cập nhật' : 'Thêm'}
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setShowModal(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                        </DialogPanel>
                    </div>
                    </div>
                </form>
            </Dialog>
        </div>
    </div>
  );
}