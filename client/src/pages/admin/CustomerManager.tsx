import { FaEdit, FaPlus } from "react-icons/fa";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetCustomerQuery, useUpdateCustomerMutation } from "~/services/customer/customer.service";
import { ICustomer } from "~/interfaces/types/user";
import { Toastify } from "~/helpers/Toastify";
import { getLinkImage } from "~/constants/functions";
import { Button } from "react-daisyui";
import { useRegisterMutation } from "~/services/auth/auth.services";
import { nanoid } from "@reduxjs/toolkit";

export function CustomerManager() {
    const { data: customers, isLoading, refetch } = useGetCustomerQuery();
    const [updateCustomer] = useUpdateCustomerMutation();
    const [createCustomer] = useRegisterMutation();
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);

    const addForm = useForm<ICustomer>();
    const editForm = useForm<ICustomer>();
    const { register: registerAdd, handleSubmit: handleSubmitAdd, reset: resetAdd, formState: { errors: errorsAdd } } = addForm;
    const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, setValue: setValueEdit, formState: { errors: errorsEdit } } = editForm;

    const handleEditClick = (customer: ICustomer) => {
        setSelectedCustomer(customer);
        setValueEdit('full_name', customer.full_name);
        setValueEdit('username', customer.username!);
        setValueEdit('is_block', customer.is_block);
        setValueEdit('phone', customer.phone);
        setValueEdit('sex', customer.sex);
        setValueEdit('email', customer.email);
        setValueEdit('address', customer.address);
        setShowEditModal(true);
    };

    const handleClickAddCustomer = () => {
        setSelectedCustomer(null);
        resetAdd();
        setShowAddModal(true);
    };

    const normalizePayload = (data: any) => {
        const payload = { ...data };
        if (payload.is_block === '1' || payload.is_block === 1 || payload.is_block === 'true') payload.is_block = true;
        else if (payload.is_block === '0' || payload.is_block === 0 || payload.is_block === 'false') payload.is_block = false;
        if (typeof payload.sex === 'string' && payload.sex !== '') payload.sex = Number(payload.sex);
        return payload;
    };

    const onAddSubmit = async (data: ICustomer) => {
        try {
            const payload = normalizePayload(data);
            await createCustomer({ ...payload }).unwrap();
            Toastify('Thêm khách hàng thành công', 201);
            resetAdd();
            setShowAddModal(false);
            refetch();
        } catch (error) {
            const errorMessage = (error as { data?: { message?: string } })?.data?.message || 'Đã có lỗi xảy ra!';
            Toastify(errorMessage, 400);
        }
    };

    const onEditSubmit = async (data: ICustomer) => {
        try {
            if (!selectedCustomer) return;
            const payload = normalizePayload(data);
            await updateCustomer({ id: selectedCustomer.id!, data: payload }).unwrap();
            Toastify('Cập nhật khách hàng thành công', 201);
            resetEdit();
            setShowEditModal(false);
            refetch();
        } catch (error) {
            const errorMessage = (error as { data?: { message?: string } })?.data?.message || 'Đã có lỗi xảy ra!';
            Toastify(errorMessage, 400);
        }
    };

    return (
        <div className="px-20 py-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-3xl">Khách hàng</h1>
                <Button onClick={handleClickAddCustomer} className="flex items-center space-x-2 bg-black text-white px-3 rounded-2xl">
                    <FaPlus /><span>Thêm khách hàng</span>
                </Button>
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
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Hình ảnh</th>
                                            <th>Tên</th>
                                            <th>Email</th>
                                            <th>Số điện thoại</th>
                                            <th>Trạng thái</th>
                                            <th>Thời gian tạo</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers?.data?.map((customer: ICustomer) => (
                                        <tr className="text-center" key={nanoid()}>
                                            <td>{customer.id}</td>
                                            <td className="flex justify-center py-2">
                                                <img src={getLinkImage(customer?.avatar)} alt="image" className="w-20 h-20 rounded-full object-cover"/>
                                            </td>
                                            <td>{customer?.full_name ?? ""}</td>
                                            <td>{customer?.email ?? ""}</td>
                                            <td>{customer?.phone ?? ""}</td>
                                            <td>{!customer?.is_block ? "Hoạt động" : "Bị chặn"}</td>
                                            <td>{new Date(customer.created_at!).toLocaleString('vi-VN')}</td>
                                            <td className="">
                                                <button
                                                    onClick={() =>handleEditClick(customer)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded flex items-center mx-auto"
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
                <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} className="relative z-10">
                    <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                    />
                        <form onSubmit={handleSubmitAdd(onAddSubmit)} className="space-y-4 mt-4">
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
                                            Thêm khách hàng
                                            </DialogTitle>

                                            <div className="mt-2">
                                                <label className="label">Email khách hàng </label>
                                                <input
                                                    {...registerAdd('email', { required: 'Email khách hàng là bắt buộc' })}
                                                    type="text"
                                                    placeholder="Nhập email khách hàng"
                                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                />
                                                {errorsAdd.email && <p className="text-red-500 text-sm ">{errorsAdd.email.message}</p>}
                                            </div>

                                            <div className="mt-2">
                                                <label className="label">Mật khẩu</label>
                                                <input
                                                    {...registerAdd('password', { required: 'Mật khẩu là bắt buộc' })}
                                                    type="password"
                                                    placeholder="Nhập mật khẩu"
                                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                />
                                                {errorsAdd.password && <p className="text-red-500 text-sm ">{errorsAdd.password.message}</p>}
                                            </div>

                                            <div className="mt-2">
                                                <label className="label">Giới tính</label>
                                                <select {...registerAdd('sex')} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                                                    <option value={0}>Nam</option>
                                                    <option value={1}>Nữ</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="submit" form="customer-add-form" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Thêm</button>
                                    <button type="button" data-autofocus onClick={() => setShowAddModal(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                </div>
                                </DialogPanel>
                            </div>
                            </div>
                        </form>
                </Dialog>
                {/* Edit Dialog */}
                <Dialog open={showEditModal} onClose={() => setShowEditModal(false)} className="relative z-10">
                    <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
                    <form id="customer-edit-form" onSubmit={handleSubmitEdit(onEditSubmit)} className="space-y-4 mt-4">
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-left">
                                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">Chỉnh sửa khách hàng</DialogTitle>
                                                <div className="mt-2">
                                                    <label className="label">Email khách hàng </label>
                                                    <input {...registerEdit('email', { required: 'Email khách hàng là bắt buộc' })} type="text" placeholder="Nhập email khách hàng" disabled className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                                                    {errorsEdit.email && <p className="text-red-500 text-sm ">{errorsEdit.email.message}</p>}
                                                </div>
                                                <div className="mt-2">
                                                    <label className="label">Tên khách hàng </label>
                                                    <input type="text" {...registerEdit('full_name', { required: 'Tên khách hàng là bắt buộc' })} placeholder="Nhập tên khách hàng" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                                                    {errorsEdit.full_name && <p className="text-red-500 text-sm ">{errorsEdit.full_name.message}</p>}
                                                </div>
                                                <div className="mt-2">
                                                    <label className="label">Số điện thoại</label>
                                                    <textarea {...registerEdit('phone')} placeholder="Nhập số điện thoại khách hàng" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                                                </div>
                                                <div className="mt-2">
                                                    <label className="label">Địa chỉ </label>
                                                    <textarea {...registerEdit('address')} placeholder="Nhập địa chỉ khách hàng" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                                                </div>
                                                <div className="mt-2">
                                                    <label className="label" htmlFor="is_block">Trạng thái hoạt động</label>
                                                    <select {...registerEdit('is_block')} name="is_block" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                                                        <option value={0}>Hoạt động</option>
                                                        <option value={1}>Chặn tài khoản</option>
                                                    </select>
                                                </div>
                                                <div className="mt-2">
                                                    <label className="label">Giới tính</label>
                                                    <select {...registerEdit('sex')} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                                                        <option value={0}>Nam</option>
                                                        <option value={1}>Nữ</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="submit" form="customer-edit-form" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Cập nhật</button>
                                        <button type="button" data-autofocus onClick={() => setShowEditModal(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
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