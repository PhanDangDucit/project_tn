import { FaEdit } from "react-icons/fa";
import { useCreateProductMutation, useGetProductQuery, useUpdateProductMutation } from "~/services/product/product.service";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { Button } from 'react-daisyui';
import { TProduct } from "~/interfaces/types/product";
import { Toastify } from "~/helpers/Toastify";
import { useGetProductCategoriesQuery } from "~/services/product-category/productCategories.service";

export function ProductManager() {

    const { data: products, isLoading, refetch } = useGetProductQuery();
    const {data: categories} = useGetProductCategoriesQuery();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    // const [deleteProduct] = useDeleteProductMutation();

    console.log('products', products);
    console.log('categories', categories);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setselectedProduct] = useState<TProduct | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TProduct>();

    const handleEditClick = (product: TProduct) => {
        setselectedProduct(product);
        setValue('name', product.name);
        setValue('description', product.description!);
        setValue('price', product.price);
        setValue('category_id', product.category_id);
        setValue('image', product.image);
        setValue('price_sale', product.price_sale);
        setShowModal(true);
    };
    
    // handle delete product category
    // const handleDeleteProduct = async (id: string) => {
    //     try {
    //         await deleteProduct(id).unwrap();
    //         Toastify('Xóa sản phẩm thành công', 201);
    //         refetch();
    //     } catch (error) {
    //         const errorMessage =
    //             (error as { data?: { message?: string } })?.data?.message ||
    //             'Đã có lỗi xảy ra!';
    //         Toastify(errorMessage, 400);
    //     }
    // };

    // handle form submit
    const onSubmit = async (data: TProduct) => {
        try {
            if (selectedProduct) {
                await updateProduct({
                    id: selectedProduct.id!,
                    data,
                }).unwrap();
                Toastify('Cập nhật sản phẩm thành công', 201);
            } else {
                await createProduct(data).unwrap();
                Toastify('Thêm sản phẩm thành công', 201);
            }
            reset();
            setShowModal(false);
            refetch();
        } catch (error) {
            const errorMessage =
                (error as { data?: { message?: string } })?.data?.message ||
                'Đã có lỗi xảy ra!';
            Toastify(errorMessage, 400);
        }
    };

    // handle click button to add product category
    const handleClickAddProductCategory = () => {
        setselectedProduct(null);
        reset();
        setShowModal(true);
    }

    return (
        <div className="px-20 py-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-3xl">Sản phẩm</h1>
                <Button
                    onClick={handleClickAddProductCategory}
                    className="flex items-center space-x-2 bg-black text-white px-3 rounded-2xl"
                    >
                    <FaPlus/><span>Thêm sản phẩm</span>
                </Button>
            </div>
            <div className="mt-4">
                {isLoading ? (
                    <div className="text-center text-gray-500">Đang tải...</div>
                ) : (
                   <>
                        {!products?.data?.length ? (
                            <div className="col-span-full text-center text-gray-500">
                                Không có sản phẩm nào!
                            </div>
                        ) : (
                            <>
                                <table className="w-full">
                                    <thead className="">
                                        <th>ID</th>
                                        <th>Hình ảnh</th>
                                        <th>Tên</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Thời gian tạo</th>
                                        <th>Hành động</th>
                                    </thead>
                                    <tbody>
                                        {products?.data?.map((product: TProduct) => (
                                        <tr className="text-center">
                                            <td>{product.id}</td>
                                            <td className="flex justify-center">
                                                <img src={product.image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbkwbU36ZqP0s6_Ltc3z7t0n1sGvavBn6mA&s"} alt="image" className="w-20 h-20"/>
                                            </td>
                                            <td>{product?.name ?? ""}</td>
                                            <td>{product?.price?.toLocaleString('vi-VN')}₫</td>
                                            <td>{product?.quantity ?? 0}</td>
                                            <td>{new Date(product.created_at!).toLocaleString('vi-VN')}</td>
                                            <td className="px-4 py-3 flex items-center justify-center space-x-2 mt-2">
                                                {/* <button
                                                    onClick={() => handleDeleteProduct(product.id!)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded flex items-center"
                                                >
                                                    <FaTrash className="mr-1" /> Xóa
                                                </button> */}
                                                <button
                                                    onClick={() => handleEditClick(product)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                                                >
                                                    <FaEdit className="mr-1" /> Sửa
                                                </button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                   </>
                )}
            </div>
            {/* Popup */}
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
                                            {selectedProduct ? 'Chỉnh sửa sản phẩm sản phẩm' : 'Thêm sản phẩm sản phẩm'}
                                            </DialogTitle>

                                            {/* Tên */}
                                            <div className="mt-2">
                                                <label className="label">Tên sản phẩm </label>
                                                <input
                                                    {...register('name', {
                                                        required: 'Tên sản phẩm là bắt buộc',
                                                    })}
                                                    type="text"
                                                    placeholder="Nhập tên sản phẩm"
                                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-sm ">{errors.name.message}</p>
                                                )}
                                            </div>

                                            {/* danh mục */}
                                            <div className="mt-2">
                                                <label className="label">Danh mục sản phẩm </label>
                                                <select
                                                    {...register('category_id', {
                                                        required: 'Danh mục sản phẩm là bắt buộc',
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

                                            <div className="mt-2">
                                                <label className="label">Mô tả sản phẩm </label>
                                                <textarea
                                                    {...register('description')}
                                                    placeholder="Nhập mô tả sản phẩm"
                                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                />
                                                {errors.description && (
                                                    <p className="text-red-500 text-sm ">{errors.description.message}</p>
                                                )}
                                            </div>
                                            {/* Image */}
                                            <div className="mt-2">
                                                <label className="label">Hình ảnh sản phẩm </label>
                                                <input
                                                    {...register('image')}
                                                    type="text"
                                                    placeholder="Nhập hình ảnh sản phẩm"
                                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                />
                                                {errors.image && (
                                                    <p className="text-red-500 text-sm ">{errors.image.message}</p>
                                                )}
                                            </div>

                                            {/* Giá */}
                                            <div className="mt-2">
                                                <label className="label">Giá sản phẩm </label>
                                                <input
                                                    {...register('price', {
                                                        required: 'Giá sản phẩm là bắt buộc',
                                                    })}
                                                    type="number"
                                                    min={0}
                                                    placeholder="Nhập giá sản phẩm"
                                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                />
                                                {errors.price && (
                                                    <p className="text-red-500 text-sm ">{errors.price.message}</p>
                                                )}
                                            </div>
                                            {/* Giá khuyến mãi */}
                                            <div className="mt-2">
                                                <label className="label">Giá khuyến mãi </label>
                                                <input
                                                    {...register('price_sale')}
                                                    type="number"
                                                    min={0}
                                                    placeholder="Nhập giá khuyến mãi"
                                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    >
                                        {selectedProduct ? 'Cập nhật' : 'Thêm'}
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
    )
}