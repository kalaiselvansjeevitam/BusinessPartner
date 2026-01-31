// import { Bell, LogOut, Search, Settings } from 'lucide-react';
import { User, LogOut } from "lucide-react";
// import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../core/hooks/windowResize";
import { ROUTE_URL } from "../../core/constants/coreUrl";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
// import { useGetadminUserLogout } from "../../core/api/Dashboard.service";
// import useWindowSize from '@/app/core/hooks/windowResize';
// import { ROUTE_URL } from '@/app/core/constants/coreUrl';
// import { Input } from '../ui/input';

interface HeaderProps {
  headerTitle: string;
  css?: string;
  description?: string;
  width?: string;
  toolbar?: React.ReactNode;
}
export interface SweetAlertResult<T = any> {
  readonly isConfirmed: boolean;
  readonly isDenied: boolean;
  readonly isDismissed: boolean;
  readonly value?: T;
  readonly dismiss?: Swal.DismissReason;
}

const Header: React.FC<HeaderProps> = ({ headerTitle, css, toolbar }) => {
  const isDesktop = useWindowSize();
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const { mutateAsync: getLogout } = useGetadminUserLogout();

  return (
    <>
      <div
        className={`flex p-4 bg-white w-auto md:w-full justify-between items-center fixed fill-available z-10`}
      >
        <h1
          className={`${!isDesktop ? "relative left-[68px] mt-1 w-[80%]" : ""} text-xl font-bold font-dmSans ${css} 2xl:pl-5`}
        >
          {headerTitle} {!isDesktop && <br />}
        </h1>

        <div className="flex items-center gap-7">
          {isDesktop && (
            <>
              <div className="relative w-full max-w-md">
                {/* <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                /> */}
                {/* <Input placeholder="Search" className="pl-10" /> */}
              </div>
              {/* <Settings size={50} /> */}
            </>
          )}

          {/* <Bell size={isDesktop ? 50 : 20} /> */}
          {toolbar && <div>{toolbar}</div>}
          {isDesktop && (
            <div className="relative" ref={profileRef}>
              {/* Avatar */}
              <div
                onClick={() => setOpenProfile(!openProfile)}
                className="w-10 h-10 rounded-full bg-purple text-white flex items-center justify-center cursor-pointer"
              >
                {/* You can replace this with an <img /> */}
                <User size={20} />
              </div>

              {/* Dropdown */}
              {openProfile && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border z-50">
                  {/* <div className="px-4 py-3 border-b">
        <p className="text-sm font-semibold">Kalaiselvan S</p>
        <p className="text-xs text-gray-500">kalai@example.com</p>
      </div> */}

                  <button
                    onClick={() => {
                      navigate(ROUTE_URL.profile);
                      setOpenProfile(false);
                    }}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  >
                    <User size={16} className="text-gray-600" />
                    <span>View Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure to log out?",
                        showCancelButton: true,
                        confirmButtonText: "Log Out",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          sessionStorage.removeItem("session_token");
                          navigate(ROUTE_URL.login);
                        }
                      });
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600 flex gap-2 items-center cursor-pointer"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* {description && (
        <p className={`${css} text-darkGray mb-0`}>{description}</p>
      )} */}
    </>
  );
};

export default Header;
