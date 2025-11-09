import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Toastify } from '~/helpers/Toastify';
import { TPostCategory } from '~/interfaces/types/post-category';
import {
  useCreatePostCategoryMutation,
  useDeletePostCategoryMutation,
  useGetPostCategoriesQuery,
  useUpdatePostCategoryMutation,
} from '~/services/post-category/post-category.service';

export function PostCategoryManager() {
  const { data: postCategories, isLoading, refetch } = useGetPostCategoriesQuery();
  console.log('postCategories: ', postCategories);
  const [createPostCategory] = useCreatePostCategoryMutation();
  const [updatePostCategory] = useUpdatePostCategoryMutation();
  const [deletePostCategory] = useDeletePostCategoryMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedPostCategory, setSelectedPostCategory] = useState<TPostCategory | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TPostCategory>();

  const handleEditClick = (category: TPostCategory) => {
    setSelectedPostCategory(category);
    setValue('name', category.name);
    setShowModal(true);
  };

  const handleDeletePostCategory = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      try {
        await deletePostCategory(id).unwrap();
        Toastify('Xóa danh mục bài viết thành công', 201);
        refetch();
      } catch (error) {
        const errorMessage =
          (error as { data?: { message?: string } })?.data?.message || 'Đã có lỗi xảy ra!';
        Toastify(errorMessage, 400);
      }
    }
  };

  const onSubmit = async (data: TPostCategory) => {
    try {
      if (selectedPostCategory) {
        await updatePostCategory({ id: selectedPostCategory.id!, data }).unwrap();
        Toastify('Cập nhật danh mục bài viết thành công', 201);
      } else {
        await createPostCategory(data).unwrap();
        Toastify('Thêm danh mục bài viết thành công', 201);
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

  const handleClickAddCategory = () => {
    setSelectedPostCategory(null);
    reset();
    setShowModal(true);
  };

  return (
    <div className="px-20 py-10">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Danh mục bài viết</h1>
        <Button onClick={handleClickAddCategory} className="flex items-center space-x-2 bg-black text-white px-3 rounded-2xl">
          <FaPlus />
          <span>Thêm danh mục</span>
        </Button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="text-center text-gray-500">Đang tải...</div>
        ) : (
          <>
            {!postCategories?.data?.length ? (
              <div className="col-span-full text-center text-gray-500">Không có danh mục nào!</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Thời gian tạo</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {postCategories?.data?.map((category: TPostCategory) => (
                    <tr key={nanoid()} className="text-center">
                      <td>{category.id}</td>
                      <td>{category.name ?? ''}</td>
                      <td>{new Date(category.created_at!).toLocaleString('vi-VN')}</td>
                      <td className="px-4 py-3 flex items-center justify-center space-x-2 mt-2">
                        <button
                          onClick={() => handleDeletePostCategory(category.id!)}
                          className="bg-red-600 text-white px-3 py-1 rounded flex items-center"
                        >
                          <FaTrash className="mr-1" /> Xóa
                        </button>
                        <button
                          onClick={() => handleEditClick(category)}
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
                                {selectedPostCategory ? 'Chỉnh sửa danh mục bài viết' : 'Thêm danh mục bài viết'}
                                </DialogTitle>
                                <div className="mt-2">
                                    <label className="label">Tên danh mục </label>
                                    <input
                                        {...register('name', {
                                            required: 'Tên danh mục là bắt buộc',
                                        })}
                                        type="text"
                                        placeholder="Nhập tên bài viết"
                                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm ">{errors.name.message}</p>
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
                            {selectedPostCategory ? 'Cập nhật' : 'Thêm'}
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
  );
}