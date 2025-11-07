import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toastify } from "~/helpers/Toastify";
import { useLogoutHandler } from "~/hooks/useLogoutHandler";
import { useGetMeQuery } from "~/services/auth/auth.services";
import { useLogoutMutation } from "~/services/auth/logout.services";
import { RootState } from '~/redux/storage/store';
import { useAppSelector } from '~/hooks/HookRouter';
import { ILogoutError } from "~/interfaces/types/auth/auth";


export function UserDropDown() {
  const { data: userData } = useGetMeQuery();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  // Handle logout
  const { handleLogout: logoutHandler } = useLogoutHandler();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth);
  // console.log("auth in userdropdown:: ", auth);

  const handleLogout = async () => {
    try {
      await logout({accessToken: auth.accessToken!});
      logoutHandler();
      Toastify('Đăng xuất thành công', 201);
      navigate('/', { replace: true });
    } catch (error) {
      const err = error as ILogoutError;
      if (err.data?.message === 'Không tìm thấy session để xóa') {
        logoutHandler();
      } else {
        Toastify('Đăng xuất thất bại', 400);
      }
    }
  };
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
        if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
            setUserMenuOpen(false);
        }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // console.log("userData in header:: ", userData?.data?.avatar);

    return (
        <div>
              <div className="relative" ref={userMenuRef}>
                {userData ? (
                  // Authenticated: show avatar (if available) or fallback icon
                  <button
                    onClick={() => setUserMenuOpen(v => !v)}
                    className="p-1 hover:bg-gray-100 rounded-full transition flex items-center"
                    aria-expanded={userMenuOpen}
                  >
                    {/*
                      Try common avatar fields; adjust according to your API:
                      userData.user?.avatar || userData?.avatar
                    */}
                    { userData?.data?.avatar ? (
                      <img
                        src={(userData as any).user?.avatar || (userData as any).avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                </button>
                ) : (
                  // Not authenticated: show user icon
                  <button
                    onClick={() => setUserMenuOpen(v => !v)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    aria-expanded={userMenuOpen}
                  >
                    <User className="w-5 h-5" />
                  </button>
                )}

                {/* Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                    <ul className="py-1">
                      {auth.accessToken ? (
                        <>
                          <li>
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link
                              to="/login"
                              className="block px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/register"
                              className="block px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Signup
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
        </div>
    )
}