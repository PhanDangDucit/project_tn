import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toastify } from "~/helpers/Toastify";
import { useChangePasswordMutation, useGetMeQuery } from "~/services/auth/auth.services";
import { ProfileSidebar } from "~/layouts/pages/user/ProfileSidebar"
type ChangePasword = {
    oldPassword: string;
    password: string;
    rePassword: string;
}
export const ChangePassword: React.FC<object> = () => {
    const navigate = useNavigate();
    const { data: userData } = useGetMeQuery();
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    
    const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    } = useForm<ChangePasword>();
    
    const onSubmit: SubmitHandler<ChangePasword> = async (data) => {
        if (!userData?.data?.id) {
            Toastify("Không tìm thấy thông tin người dùng", 400);
            return;
        }
        try {
            await changePassword({
                currentPassword: data.oldPassword,
                password: data.password,
                password_confirmation: data.rePassword,
            }).unwrap();
            Toastify('Đổi mật khẩu thành công', 200);
            navigate('/profile');
        } catch (error) {
            Toastify('Đổi mật khẩu thất bại', 400);
        }
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
                            <div className="flex w-full flex-col gap-6">
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Mật khẩu hiện tại</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập mật khẩu hiện tại"
                                        {...register('oldPassword', {
                                            required: 'Vui lòng nhập mật khẩu',
                                            minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                                        })}
                                        type="password"
                                    />
                                    {errors?.oldPassword && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.oldPassword?.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Mật khẩu mới</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập mật khẩu mới"
                                        {...register('password', {
                                            required: 'Vui lòng nhập mật khẩu',
                                            minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                                        })}
                                        type="password"
                                    />
                                    {errors?.password && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.password?.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Nhập lại mật khẩu mới</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập lại mật khẩu mới"
                                        {...register('rePassword', {
                                            required: 'Vui lòng nhập lại mật khẩu',
                                            validate: (value) =>
                                                value === watch('password') || 'Mật khẩu không khớp'
                                        })}
                                        type="password"
                                    />
                                    {errors?.rePassword && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.rePassword?.message}
                                        </div>
                                    )}
                                </div>
                               
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="bg-black text-white rounded-2xl py-2 cursor-pointer hover:opacity-80 w-[310px] disabled:opacity-50"
                                >
                                    {isLoading ? 'Đang lưu...' : 'Lưu'}
                                </button>
                            </div>
                        </form>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}