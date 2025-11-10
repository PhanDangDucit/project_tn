import { FaEdit } from "react-icons/fa";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetCustomerQuery, useUpdateCustomerMutation } from "~/services/customer/customer.service";
import { ICustomer } from "~/interfaces/types/user";
import { Toastify } from "~/helpers/Toastify";
import { Eye } from "lucide-react";

export function CustomerManager() {
    const { data: customers, isLoading, refetch } = useGetCustomerQuery();
    const [updateCustomer] = useUpdateCustomerMutation();
    console.log('customers', customers);
    
        const [showModal, setShowModal] = useState(false);
        const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);
    
        const {
            register,
            handleSubmit,
            reset,
            setValue,
            formState: { errors },
        } = useForm<ICustomer>();
    
        const handleEditClick = (customer: ICustomer) => {
            setSelectedCustomer(customer);
            setValue('full_name', customer.full_name);
            setValue('username', customer.username!);
            setValue('is_block', customer.is_block);
            setValue('phone', customer.phone);
            setValue('sex', customer.sex);
            setValue('email', customer.email);
            setValue('address', customer.address);
            setShowModal(true);
        };
        // handle form submit
        const onSubmit = async (data: ICustomer) => {
            try {
                if (selectedCustomer) {
                    await updateCustomer({
                        id: selectedCustomer.id!,
                        data,
                    }).unwrap();
                    Toastify('Cập nhật khách hàng thành công', 201);
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

    return (
        <div className="px-20 py-10">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-3xl">Khách hàng</h1>
                    </div>
                    <div className="mt-4">
                        {isLoading ? (
                            <div className="text-center text-gray-500">Đang tải...</div>
                        ) : (
                           <>
                                {!customers?.data?.length ? (
                                    <div className="col-span-full text-center text-gray-500">
                                        Không có khách hàng nào!
                                    </div>
                                ) : (
                                    <>
                                        <table className="w-full">
                                            <thead className="">
                                                <th>ID</th>
                                                <th>Hình ảnh</th>
                                                <th>Tên</th>
                                                <th>Email</th>
                                                <th>Số điện thoại</th>
                                                {/* <th>Trạng thái</th> */}
                                                <th>Thời gian tạo</th>
                                                <th>Hành động</th>
                                            </thead>
                                            <tbody>
                                                {customers?.data?.map((customer: ICustomer) => (
                                                <tr className="text-center">
                                                    <td>{customer.id}</td>
                                                    <td className="flex justify-center">
                                                        <img src={customer.avatar ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbkwbU36ZqP0s6_Ltc3z7t0n1sGvavBn6mA&s"} alt="image" className="w-20 h-20"/>
                                                    </td>
                                                    <td>{customer?.full_name ?? ""}</td>
                                                    <td>{customer?.email ?? ""}</td>
                                                    <td>{customer?.phone ?? ""}</td>
                                                    {/* <td>{!customer?.is_block ? "Hoạt động" : "Không hoạt động"}</td> */}
                                                    <td>{new Date(customer.created_at!).toLocaleString('vi-VN')}</td>
                                                    <td className="px-4 py-3 flex items-center justify-center space-x-2 mt-2">
                                                        <button
                                                            onClick={() =>handleEditClick(customer)}
                                                            className="bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                                                        >
                                                            <FaEdit className="mr-1" /> Sửa
                                                        </button>
                                                        {/* <button
                                                            className="bg-green-600 text-white px-3 py-1 rounded flex items-center"
                                                        >
                                                            <Eye className="mr-1" /> Xem
                                                        </button> */}
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
                                                    {selectedCustomer ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng'}
                                                    </DialogTitle>
        
                                                    {/* Tên */}
                                                    <div className="mt-2">
                                                        <label className="label">Email khách hàng </label>
                                                        <input
                                                            {...register('email', {
                                                                required: 'Email khách hàng là bắt buộc',
                                                            })}
                                                            type="text"
                                                            placeholder="Nhập email khách hàng"
                                                            disabled={!!selectedCustomer}
                                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                        />
                                                        {errors.email && (
                                                            <p className="text-red-500 text-sm ">{errors.email.message}</p>
                                                        )}
                                                    </div>
                                                    <div className="mt-2">
                                                        <label className="label">Tên khách hàng </label>
                                                        <input
                                                            {...register('full_name', {
                                                                required: 'Tên khách hàng là bắt buộc',
                                                            })}
                                                            type="text"
                                                            placeholder="Nhập tên khách hàng"
                                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                        />
                                                        {errors.full_name && (
                                                            <p className="text-red-500 text-sm ">{errors.full_name.message}</p>
                                                        )}
                                                    </div>
        
                                                    <div className="mt-2">
                                                        <label className="label">Số điện thoại</label>
                                                        <textarea
                                                            {...register('phone')}
                                                            placeholder="Nhập số điện thoại khách hàng"
                                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                        />
                                                        {errors.phone && (
                                                            <p className="text-red-500 text-sm ">{errors.phone.message}</p>
                                                        )}
                                                    </div>
                                                    <div className="mt-2">
                                                        <label className="label">Địa chỉ </label>
                                                        <textarea
                                                            {...register('address')}
                                                            placeholder="Nhập địa chỉ khách hàng"
                                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                        />
                                                        {errors.address && (
                                                            <p className="text-red-500 text-sm ">{errors.address.message}</p>
                                                        )}
                                                    </div>
                                                    {/* <div className="mt-2">
                                                        <label className="label">Trạng thái chặn </label>
                                                        <select
                                                            {...register('is_block')}
                                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                        >
                                                            <option value="0" selected>Chọn trạng thái</option>
                                                            <option value="1">
                                                                Chặn tài khoản
                                                            </option>
                                                            <option value="0">
                                                                Bỏ chặn tài khoản
                                                            </option>
                                                        </select>
                                                    </div> */}
                                                    <div className="mt-2">
                                                        <label className="label">Giới tính</label>
                                                        <select
                                                            {...register('sex')}
                                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                        >
                                                            <option value="nam">
                                                                Nam
                                                            </option>
                                                            <option value="nu">
                                                                Nữ
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            >
                                                {selectedCustomer ? 'Cập nhật' : 'Thêm'}
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