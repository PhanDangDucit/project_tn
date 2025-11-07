import { useState } from "react";
import { useForm } from "react-hook-form";
import { ICustomer } from "~/interfaces/types/user";
import { ProfileSidebar } from "~/layouts/pages/user/ProfileSidebar"

export const UpdateProfile: React.FC<object> = () => {
    const [err] = useState(false);
    
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<ICustomer>();
    
    const onSubmit = async function () {
        
    };
    return (
        <div className="flex flex-wrap py-20 max-w-[1200px] mx-auto">
            <div className='w-3/12 relative'>
                <ProfileSidebar/>
            </div>
            <div className="w-9/12 flex flex-col gap-4">
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-3xl'>Cập nhật thông tin cá nhân</h1>
                </div>
                <div className="px-4">
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex w-full mb-2">
                                {err && (
                                <div className="text-[#e53e3e] bg-red-300 px-4 py-2">
                                    Sai tài khoản hoặc mật khẩu hoặc mật khẩu
                                </div>
                                )}
                            </div>
                            <div className="flex w-full flex-col gap-6">
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Họ tên</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập họ tên"
                                        {...register('full_name', {
                                            required: 'Vui lòng nhập họ tên',
                                        })}
                                        type="text"
                                        name="fullname"
                                    />
                                    {errors?.email && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.full_name?.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Email</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập Email"
                                        {...register('email', {
                                            required: 'Vui lòng nhập Email',
                                        })}
                                        type="text"
                                        name="email"
                                    />
                                    {errors?.email && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.email?.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Số điện thoại</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập số điện thoại"
                                        {...register('phone', {
                                            required: 'Vui lòng nhập số điện thoại',
                                        })}
                                        type="text"
                                        name="phone"
                                    />
                                    {errors?.password && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.phone?.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Địa chỉ</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập địa chỉ"
                                        {...register('address', {
                                            required: 'Vui lòng nhập địa chỉ',
                                        })}
                                        type="text"
                                        name="address"
                                    />
                                    {errors?.password && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.address?.message}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-black text-white rounded-2xl py-2 cursor-pointer hover:opacity-80 w-[310px]"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}