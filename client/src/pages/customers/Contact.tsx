import { useForm, SubmitHandler } from "react-hook-form";
import { Toastify } from "~/helpers/Toastify";
import { TContact } from "~/interfaces/types/contact";
import { useCreateContactMutation } from "~/services/contact/contact.service";

export const ContactPage = ({ }) => {
  const [createContact] = useCreateContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TContact>();

  const onSubmit: SubmitHandler<TContact> = async(data) => {
    try {
        await createContact(data).unwrap();
        Toastify('Gửi thông tin liên hệ thành công', 200);
        reset();
      } catch (error: unknown) {
        // const errorData = isIErrorResponse(error) ? error.data : null;
        Toastify(`Gửi thông tin liên hệ thất bại`, 400);
      }
  };

  return (
    <div className="py-20 flex gap-14 max-w-[1200px] w-full mx-auto">
      {/* Left */}
      <div className='flex flex-col gap-6 w-1/2'>
        <h1 className='font-bold text-3xl'>Thông tin liên hệ</h1>
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="fullname">Họ tên</label>
              <input 
                type="text" 
                placeholder="Họ và tên" 
                id="fullname" 
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 mt-2 mb-3"
                {...register('fullname', { required: 'Vui lòng nhập họ tên' })}
              />
              {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}

              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                placeholder="email..." 
                id="email" 
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 mt-2 mb-3"
                {...register('email', { 
                  required: 'Vui lòng nhập email',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ"
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              <label htmlFor="phone">Số điện thoại</label>
              <input 
                type="text" 
                placeholder="phone..." 
                id="phone" 
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 mt-2 mb-3"
                {...register('phone', { required: 'Vui lòng nhập số điện thoại' })}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              <label htmlFor="topic">Chủ đề</label>
              <input 
                type="text" 
                placeholder="chủ đề..." 
                id="topic" 
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 mt-2 mb-3"
                {...register('topic', { required: 'Vui lòng nhập đề tài' })}
              />
              {errors.topic && <p className="text-red-500 text-sm">{errors.topic.message}</p>}

              <label htmlFor="content">Nội dung</label>
              <textarea 
                placeholder="Nội dung" 
                id="content" 
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 mt-2 mb-3"
                {...register('content', { required: 'Vui lòng nhập nội dung' })}
              />
              {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

              <button type="submit" className="block w-full rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 mt-4 max-w-[200px] cursor-pointer" >Gửi</button>
            </form>
          </div>
      </div>
      {/* Right */}
      <div className='flex flex-col gap-[26px] w-1/2 px-10 justify-center'>
        <h2 className="font-bold text-3xl">Liên hệ</h2>
        <div className='flex gap-6'>
          <h2 className="font-semibold text-base">Facebook:</h2>
          <p className="font-normal text-base">https://www.facebook.com/fitness</p>
        </div>
        <div className='flex gap-6'>
          <h2 className="font-semibold text-base">Số điện thoại:</h2>
          <p className="font-normal text-base">0123456789</p>
        </div>
        <div className='flex gap-6'>
          <h2 className="font-semibold text-base">Email:</h2>
          <p className="font-normal text-base">fitness.support@gmail.com</p>
        </div>
        <div className='flex gap-6'>
          <h2 className="font-semibold text-base text-nowrap">Địa chỉ:</h2>
          <p className="font-normal text-base">23 Trường Sa, Street, Ngũ Hành Sơn, Đà Nẵng 55000, Vietnam</p>
        </div>
      </div>
    </div>
  );
};