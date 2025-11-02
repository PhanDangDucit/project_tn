import { Link } from "react-router-dom"
import { ProfileSidebar } from "~/layouts/pages/user/ProfileSidebar"

export const Profile: React.FC<object> = () => {
    return (
        <div className="flex flex-wrap py-20 max-w-[1200px] mx-auto">
            <div className='w-3/12 relative'>
                <ProfileSidebar/>
            </div>
            <div className="w-9/12 flex flex-col gap-4">
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-3xl'>Thông tin cá nhân</h1>
                    <div className="w-[310px] flex flex-col gap-4">
                        <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPwOSOKnfg-V_iiFfwLYdYUs_6_NYGQ9eqA&s" alt="avatar user"
                            className="w-full aspect-square rounded-full"
                        />
                        <p className="text-center">cdscasdcsavsadv</p>
                        <button
                            type="button" 
                            className="bg-black text-white rounded-2xl py-2 cursor-pointer hover:opacity-80"
                        >
                            Thay đổi avatar
                        </button>
                   </div>
                </div>
                <div className="p-4 bg-black text-white flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className='flex gap-6'>
                            <h2 className="font-semibold text-base">Họ tên:</h2>
                            <p className="font-normal text-base">âcscasd</p>
                        </div>
                        <div className='flex gap-6'>
                            <h2 className="font-semibold text-base">Email:</h2>
                            <p className="font-normal text-base">fitness.support@gmail.com</p>
                        </div>
                        <div className='flex gap-6'>
                            <h2 className="font-semibold text-base">Số điện thoại:</h2>
                            <p className="font-normal text-base">0123456789</p>
                        </div>
                        <div className='flex gap-6'>
                            <h2 className="font-semibold text-base">Giới tính:</h2>
                            <p className="font-normal text-base">0123456789</p>
                        </div>
                        <div className='flex gap-6'>
                            <h2 className="font-semibold text-base text-nowrap">Địa chỉ:</h2>
                            <p className="font-normal text-base">23 Trường Sa, Street, Ngũ Hành Sơn, Đà Nẵng 55000, Vietnam</p>
                        </div>
                    </div>
                    <div className="bg-white text-black rounded-2xl py-2 cursor-pointer w-[310px] text-center hover:opacity-80">
                        <Link to="/update-profile">Cập nhật thông tin</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}