import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProfileSidebar } from "~/layouts/pages/user/ProfileSidebar"
type ChangePasword = {
    password: string;
    rePassword: string;
}
export const ChangePassword: React.FC<object> = () => {
    const [err, setErr] = useState(false);
    
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<ChangePasword>();
    
    const onSubmit = async function () {
        
    };
    return (
        <div className="flex flex-wrap py-20 max-w-[1200px] mx-auto">
            <div className='w-3/12 relative'>
                <ProfileSidebar/>
            </div>
            <div className="w-9/12 flex flex-col gap-4">
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-3xl'>Đổi mật khẩu</h1>
                </div>
                <div className="px-4">
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex w-full mb-2">
                                {err && (
                                    <div className="text-[#e53e3e] bg-red-300 px-4 py-2">
                                        Lỗi xảy ra
                                    </div>
                                )}
                            </div>
                            <div className="flex w-full flex-col gap-6">
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Mật khẩu mới</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập mật khẩu mới"
                                        {...register('password', {
                                            required: 'Vui lòng nhập mật khẩu mới',
                                        })}
                                        type="password"
                                        name="password"
                                    />
                                    {errors?.password && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.password?.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Mật lại mật khẩu mới</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập lại mật khẩu mới"
                                        {...register('rePassword', {
                                            required: 'Vui lòng nhập mật khẩu mới',
                                        })}
                                        type="password"
                                        name="rePassword"
                                    />
                                    {errors?.rePassword && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.rePassword?.message}
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