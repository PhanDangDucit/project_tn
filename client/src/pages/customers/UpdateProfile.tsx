import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toastify } from "~/helpers/Toastify";
import { ICustomer } from "~/interfaces/types/user";
import { ProfileSidebar } from "~/layouts/pages/user/ProfileSidebar"
import { useGetMeQuery } from "~/services/auth/auth.services";
import { useUpdateCustomerMutation } from "~/services/customer/customer.service";

export const UpdateProfile: React.FC<object> = () => {
    const { data: userData, refetch } = useGetMeQuery();
    const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICustomer>();

    const onSubmit: SubmitHandler<ICustomer> = async (data) => {
        if (!userData?.data?.id) return;

        try {
            await updateCustomer({
                id: String(userData.data.id),
                data,
            }).unwrap();
            Toastify('Cập nhật thông tin thành công', 200);
            refetch();
            navigate('/profile');
        } catch (error) {
            Toastify('Cập nhật thông tin thất bại', 400);
        }
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
                            <div className="flex w-full flex-col gap-6">
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Họ tên</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập họ tên"
                                        {...register('full_name')}
                                        type="text"                                        
                                        defaultValue={userData?.data?.full_name ?? ""}
                                    />
                                    {errors?.full_name && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.full_name?.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Email</label>
                                    <input
                                        className='p-4 outline-1 outline-black text-gray-400'
                                        placeholder="Nhập Email"
                                        type="text"
                                        defaultValue={userData?.data?.email}
                                        disabled
                                    />
                                </div>
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="">Số điện thoại</label>
                                    <input
                                        className='p-4 outline-1 outline-black'
                                        placeholder="Nhập số điện thoại"
                                        {...register('phone')}
                                        type="text"
                                        name="phone"
                                        defaultValue={userData?.data?.phone}
                                    />
                                    {errors?.phone && (
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
                                        {...register('address')}
                                        type="text"
                                        name="address"
                                        defaultValue={userData?.data?.address}
                                    />
                                    {errors?.address && (
                                        <div className="text-[#e53e3e]">
                                        {errors?.address?.message}
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