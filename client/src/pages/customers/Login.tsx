import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LabelForm } from '~/components/auth/index';
import {
  useLoginMutation,
} from '~/services/auth/auth.services';
import { IRequestCredentials } from '~/interfaces/types/auth/auth';
import { Toastify } from '~/helpers/Toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logo } from '~/assets/images';

const LoginPage: React.FC<object> = () => {
  const [err, setErr] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestCredentials>();

  const onSubmit: SubmitHandler<IRequestCredentials> = async function (data) {
    const credentials = { email: data.email, password: data.password };
    try {
      await login(credentials).unwrap();

      setErr(false);
      Toastify('Đăng nhập thành công', 200);
    } catch (error: unknown) {
      console.error('Login error:', error);
      // const errorData = isIErrorResponse(error) ? error.data : null;
      Toastify(`Đăng nhập thất bại`, 400);
      setErr(true);
    }
  };

  return (
      <div className='flex flex-wrap max-w-[1200px] mx-auto py-20'>
        <div className='w-1/2 relative'>
          <img src={"https://icado.vn/wp-content/uploads/2023/08/Fitness-La-Gi-Cach-Dat-Duoc-Body-Fitness-Nhanh-Nhat-5.webp"} alt="banner_intro" className='w-full h-full object-cover' />
        </div>
        <div className="sm:max-w-[504px] w-1/2">
            <div className="mx-auto flex max-w-[342px] flex-col items-center gap-4 sm:mx-0 sm:max-w-full sm:items-start sm:gap-7">
              <div className="flex items-center justify-center gap-4">
                <img width={160} src={Logo} alt="logo" />
              </div>
              <h1 className="block text-center text-[24px] font-semibold leading-6 text-primary sm:hidden">
                Đăng nhập
              </h1>
              <p className="text-[16px] font-normal leading-[25.6px] dark:text-white sm:text-[20px] sm:leading-[32px]">
                Vui lòng đăng nhập để tiếp tục
              </p>
            </div>
            <div className="mx-0 mt-2 flex w-full min-w-0 flex-col gap-6 sm:mx-auto sm:max-w-[388px] sm:gap-12">
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
                    <LabelForm title="Email" />
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
                    <LabelForm title="Mật khẩu" />
                    <input
                      className='p-4 outline-1 outline-black'
                      placeholder="Nhập mật khẩu"
                      {...register('password', {
                        required: 'Vui lòng nhập mật khẩu',
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
                 
      
                  <button
                    type="submit"
                    className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center disabled:opacity-50 cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </button>
                </div>
              </form>
              <div className="flex justify-between text-center text-xl leading-7">
                <Link
                  className="self-end text-lg leading-4 text-primary hover:underline text-blue-600 hover:text-blue-800"
                  to="/register"
                >
                  Đăng ký
                </Link>
                <Link
                  className="self-end text-lg leading-4 text-primary hover:underline text-blue-600 hover:text-blue-800"
                  to="/request-password-reset"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="flex justify-end text-center text-xl leading-7">
                <Link
                  className="self-end text-lg leading-4 text-primary hover:underline text-blue-600 hover:text-blue-800"
                  to="/auth/policy"
                >
                  Chính sách
                </Link>
              </div>
            </div>
        </div>
      </div>
  );
};

export default LoginPage;