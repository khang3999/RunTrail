import React, { useRef, useEffect } from "react";
import Menu from "@/components/Menu/Menu";
import { useAppProvider } from "@/contexts/AppProvider";
import Link from "next/link";
import { Drawer } from "flowbite"; // Adjust import to match your library
import MenuMobile from "@/components/Menu/MenuMobile";

function HomePage() {
  const { isHidden } = useAppProvider();
  const drawerRef = useRef(null);

  useEffect(() => {
    if (drawerRef.current) {
      const options = {
        placement: "left",
      };
      const drawer = new Drawer(drawerRef.current, options);

      if (!isHidden) {
        drawer.show();
      } else {
        drawer.hide();
      }
    }
  }, [isHidden]);

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Main Content */}
      <Menu />
      <MenuMobile drawerRef={drawerRef}/>
      <h1>Đây là trang chủ</h1>
      <Link className="text-lg text-blue-500" href={"/products"}>
        Chuyển tới trang danh sách sản phẩm
      </Link>
    </div>
  );
}

export default HomePage;
