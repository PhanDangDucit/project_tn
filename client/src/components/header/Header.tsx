// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Logo } from '~/assets/images';
// import { IoIosCloseCircle, IoIosGift } from 'react-icons/io';
// import { Toastify } from '~/helpers/Toastify';
// import { useAppSelector } from '~/hooks/HookRouter';
// import { useLogoutHandler } from '~/hooks/useLogoutHandler';
// import { ILogoutError } from '~/interfaces/types/auth/auth';
// import { RootState } from '~/redux/storage/store';
// import { useLogoutMutation } from '~/services/auth/logout.services';

const Header = () => {
  // const [dropdownVisible, setDropdownVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const auth = useAppSelector((state: RootState) => state.auth.currentUser);
  // const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  // const { handleLogout: logoutHandle } = useLogoutHandler();
  // const refreshToken = useAppSelector(
  //   (state: RootState) => state.auth.currentUser?.refreshToken,
  // );
 
  // const navigate = useNavigate();
  // const location = useLocation();

  // const { data: usersData, isFetching: isFetchingUsers } =

  // const {
  //   register: registerProfile,
  //   handleSubmit: handleSubmitProfile,
  //   formState: { errors: profileErrors },
  // } = useForm<Partial<IUser>>({
  //   defaultValues: {
  //     full_name: auth?.full_name,
  //     email: auth?.email,
  //     phone: auth?.phone,
  //     sex: auth?.sex,
  //     image: auth?.image,
  //   },
  // });

  // const handleAvatarClick = () => {
  //   setDropdownVisible(!dropdownVisible);
  // };

  // const handleLogout = async () => {
  //   try {
  //     await logout({ refreshToken });
  //     logoutHandle();
  //     Toastify('Đăng xuất thành công', 201);
  //     navigate('/auth/login', { replace: true });
  //   } catch (error) {
  //     const err = error as ILogoutError;
  //     if (err.data?.message === 'Không tìm thấy session để xóa') {
  //       logoutHandle();
  //     } else {
  //       Toastify('Đăng xuất thất bại', 400);
  //     }
  //   }
  // };


  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">

    </nav>
  );
};

export default Header;
