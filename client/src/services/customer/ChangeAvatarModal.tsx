import React, { useState, useRef, useEffect } from 'react';
import { useUpdateAvatarCustomerMutation } from '~/services/customer/customer.service';
import { toast } from 'react-toastify';
import { useAppSelector } from '~/hooks/HookRouter';
import { RootState } from '~/redux/storage/store';

interface ChangeAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeAvatarModal: React.FC<ChangeAvatarModalProps> = ({ isOpen, onClose }) => {
  const {currentUser: userData} = useAppSelector((state: RootState) => state.auth);
  const [updateAvatarCustomer, { isLoading }] = useUpdateAvatarCustomerMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !userData?.id) return;

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      await updateAvatarCustomer({
        id: String(userData.id),
        data: formData,
      }).unwrap();
      toast.success('Avatar updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update avatar.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Thay đổi avatar</h2>
        <div className="flex flex-col items-center gap-4">
          {preview ? (
            <img src={preview} alt="Avatar preview" className="w-48 h-48 rounded-full object-cover" />
          ) : (
            <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">Xem trước</div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400">Hủy</button>
          <button onClick={handleSubmit} disabled={isLoading || !selectedFile} className="py-2 px-4 bg-black text-white rounded-lg hover:opacity-80 disabled:opacity-50">
            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>
  );
};
