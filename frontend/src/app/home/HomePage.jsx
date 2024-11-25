import { useAppProvider } from "@/contexts/AppProvider";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Drawer } from "flowbite";

function HomePage() {
  const { isHidden, setIsHiden } = useAppProvider();
  const drawerRef = useRef(null);

  useEffect(() => {
    const options = {
      placement: "left",
    };
    const drawer = new Drawer(drawerRef.current, options);

    if (!isHidden) {
      drawer.show();
    } else {
      drawer.hide();
    }
  }, [isHidden]);

  return (
    <>
      <div className="flex items-center justify-center flex-col p-4">
        <h1>Đây là trang chủ</h1>
        <Link className="text-lg text-blue-500" href={"/products"}>
          Chuyển tới trang danh sách sản phẩm
        </Link>
      </div>

      {/* Drawer Component */}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 z-40 h-screen w-5/6 transition-transform transform -translate-x-full bg-white shadow-lg"
        tabIndex="-1"
        aria-labelledby="drawer-label"
      >
        <button type="button" className="text-gray-800 bg-transparent rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center">
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
        <div className="p-4">
          <h2 id="drawer-label" className="text-lg font-semibold">
            Mobile Drawer
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            This is a sample drawer content.
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
