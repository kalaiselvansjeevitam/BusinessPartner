import { Menu, LogOut, GraduationCap, Home } from "lucide-react";
import { Button } from "../ui/button";

import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "../../core/hooks/windowResize";
import { ROUTE_URL } from "../../core/constants/coreUrl";
// import useWindowSize from '@/app/core/hooks/windowResize';
// import { ROUTE_URL } from '@/app/core/constants/coreUrl';
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Sidebar = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const isDesktop = useWindowSize();
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: ROUTE_URL.dashboard,
    },
    {
      icon: GraduationCap,
      label: "Product Details",
      href: ROUTE_URL.product_details,
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // const getSecondUrlSegment = (url: string) => {
  //   const pathParts = url.split("/");
  //   return pathParts.length > 2 ? pathParts[2] : "";
  // };

  const SidebarItem = ({ item }: { item: any }) => {
    // const secondUrlSegment = getSecondUrlSegment(location.pathname);
    const isSelected = location.pathname === item.href;
    const isParentSelected = item.children?.some(
      (child: any) => location.pathname === child.href,
    );

    return (
      <div key={item.label}>
        <Button
          variant="ghost"
          className={`justify-start w-full flex items-center ${
            isSelected || isParentSelected
              ? "text-purple rounded-tr-lg rounded-br-lg border-purple"
              : "text-gray-700"
          }`}
          onClick={() => handleNavigation(item.href)}
        >
          <item.icon
            className={`mr-2 h-4 w-4 ${
              isSelected || isParentSelected ? "text-purple" : "text-black"
            }`}
          />
          {isDesktop ? open && item.label : item.label}
        </Button>

        {/* Always-visible submenu if children exist
        {item.children && (
          <div className="pl-6 flex flex-col gap-1 mt-1">
            {item.children.map((child: any) => (
              <Button
                key={child.label}
                variant="ghost"
                className={`justify-start w-full text-sm ${
                  location.pathname === child.href
                    ? 'text-purple  bg-gray-100'
                    : 'text-gray-600'
                }`}
                onClick={() => handleNavigation(child.href)}
              >
                {child.label}
              </Button>
            ))}
          </div>
        )} */}
        {item.children && isDesktop && open && (
          <div className="pl-6 flex flex-col gap-1 mt-1">
            {item.children.map((child: any) => (
              <Button
                key={child.label}
                variant="ghost"
                className={`justify-start w-full text-sm ${
                  location.pathname === child.href
                    ? "text-purple bg-gray-100"
                    : "text-gray-600"
                }`}
                onClick={() => handleNavigation(child.href)}
              >
                {child.icon && <child.icon className="w-4 h-4" />}
                {child.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const SidebarContent = () => (
    <div
      className={`h-full ${
        isDesktop
          ? open
            ? "w-[12.5rem]"
            : "w-16"
          : "absolute w-auto left-0 top-0 bg-transparent shadow-none"
      } bg-white transition-all flex flex-col justify-between overflow-y-auto`}
    >
      <div>
        <div className="h-[82px] text-center items-center grid border-b border-lightBlue justify-center">
          <p
            className="font-bold cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {isDesktop ? (
              open ? (
                "Jeevitam Business Partner"
              ) : (
                <Menu strokeWidth={3} />
              )
            ) : (
              "Jeevitam Business Partner"
            )}
          </p>
        </div>
        <div className="flex flex-col space-y-2 pl-1 pt-6">
          {sidebarItems.map((item) => (
            <SidebarItem item={item} key={item.label} />
          ))}
        </div>
      </div>

      {!isDesktop && (
        <div>
          <Button
            variant="ghost"
            className="justify-start w-full bg-purple text-white hover:bg-purple hover:text-white rounded-[0px]"
            onClick={() => navigate(ROUTE_URL.login)}
          >
            <p className="flex gap-3 align-middle justify-center w-full">
              <LogOut strokeWidth={3} /> {isDesktop && open ? "Logout" : ""}
            </p>
          </Button>
        </div>
      )}
    </div>
  );

  return isDesktop ? (
    <div
      className={`fixed left-0 top-0 z-10 h-screen bg-white border-r transition-all ${
        open ? "w-48" : "w-16"
      }`}
    >
      <SidebarContent />
    </div>
  ) : (
    <Sheet>
      <SheetTrigger asChild className=" fixed">
        <Button size="icon" className="m-4 bg-none border-none">
          <Menu strokeWidth={3} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className=" w-[50%]">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
