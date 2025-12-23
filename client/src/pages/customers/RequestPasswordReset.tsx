import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRequestPasswordResetMutation, useVerifyCodeMutation, useResetPasswordMutation } from '~/services/auth/auth.services';
import { IRequestPasswordReset, IResetPasswordRequest } from '~/interfaces/types/auth/auth';
import { Toastify } from '~/helpers/Toastify';
import { useNavigate } from 'react-router-dom';

type EmailForm = { email: string };
type CodeForm = { code: string };
type NewPasswordForm = { newPassword: string; confirmPassword: string };

export default function RequestPasswordResetPage() {
  const [step, setStep] = useState<number>(1);
  const [emailValue, setEmailValue] = useState<string>('');
  const [requestPasswordReset] = useRequestPasswordResetMutation();
  const [verifyCode] = useVerifyCodeMutation();
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<EmailForm>();

  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: codeErrors },
  } = useForm<CodeForm>();

  const {
    register: registerNew,
    handleSubmit: handleSubmitNew,
    formState: { errors: newErrors },
  } = useForm<NewPasswordForm>();

  const onSubmitEmail: SubmitHandler<EmailForm> = async (data) => {
    try {
      await requestPasswordReset({ email: data.email } as IRequestPasswordReset).unwrap();
      setEmailValue(data.email);
      Toastify('Mã đã được gửi tới email (nếu tồn tại)', 200);
      setStep(2);
    } catch (err) {
      Toastify('Yêu cầu thất bại', 400);
    }
  };

  const onSubmitCode: SubmitHandler<CodeForm> = async (data) => {
    try {
      // using email as user_id for verify; adjust if backend expects numeric id
      await verifyCode({ user_id: emailValue, code: data.code }).unwrap();
      Toastify('Mã hợp lệ, vui lòng nhập mật khẩu mới', 200);
      setStep(3);
    } catch (err) {
      Toastify('Mã không hợp lệ', 400);
    }
  };

  const onSubmitNew: SubmitHandler<NewPasswordForm> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      Toastify('Mật khẩu xác nhận không trùng khớp', 400);
      return;
    }
    try {
      // here we use the code as token — backend may differ
      const token = window.prompt('Vui lòng nhập lại mã đã được gửi (nếu cần)') || '';
      const payload: IResetPasswordRequest = { token, newPassword: data.newPassword };
      await resetPassword(payload).unwrap();
      Toastify('Đổi mật khẩu thành công, đăng nhập lại', 200);
      navigate('/login');
    } catch (err) {
      Toastify('Đổi mật khẩu thất bại', 400);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20">
      <div className="w-full max-w-md border p-6 rounded">
        {step === 1 && (
          <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
            <h2 className="text-2xl font-semibold mb-4">Quên mật khẩu</h2>
            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <input
                className="w-full border px-3 py-2 rounded"
                {...registerEmail('email', { required: 'Vui lòng nhập email' })}
                type="email"
              />
              {emailErrors.email && <p className="text-red-500 mt-1">{emailErrors.email.message}</p>}
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded">Gửi mã</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitCode(onSubmitCode)}>
            <h2 className="text-2xl font-semibold mb-4">Nhập mã xác thực</h2>
            <p className="text-sm mb-4">Mã đã được gửi tới: <strong>{emailValue}</strong></p>
            <div className="mb-4">
              <label className="block text-sm mb-1">Mã</label>
              <input
                className="w-full border px-3 py-2 rounded"
                {...registerCode('code', { required: 'Vui lòng nhập mã' })}
                type="text"
              />
              {codeErrors.code && <p className="text-red-500 mt-1">{codeErrors.code.message}</p>}
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-black text-white py-2 rounded">Xác thực</button>
              <button type="button" onClick={() => setStep(1)} className="flex-1 border py-2 rounded">Quay lại</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmitNew(onSubmitNew)}>
            <h2 className="text-2xl font-semibold mb-4">Tạo mật khẩu mới</h2>
            <div className="mb-4">
              <label className="block text-sm mb-1">Mật khẩu mới</label>
              <input
                className="w-full border px-3 py-2 rounded"
                {...registerNew('newPassword', { required: 'Vui lòng nhập mật khẩu mới', minLength: { value: 6, message: 'Mật khẩu ít nhất 6 ký tự' } })}
                type="password"
              />
              {newErrors.newPassword && <p className="text-red-500 mt-1">{newErrors.newPassword.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Xác nhận mật khẩu</label>
              <input
                className="w-full border px-3 py-2 rounded"
                {...registerNew('confirmPassword', { required: 'Vui lòng xác nhận mật khẩu' })}
                type="password"
              />
              {newErrors.confirmPassword && <p className="text-red-500 mt-1">{newErrors.confirmPassword.message}</p>}
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-black text-white py-2 rounded">Đổi mật khẩu</button>
              <button type="button" onClick={() => setStep(1)} className="flex-1 border py-2 rounded">Hủy</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
