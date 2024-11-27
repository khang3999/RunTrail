import React from "react";
import Menu from "@/components/Menu/Menu";
import Link from "next/link";

function HomePage() {

  return (
    <div className="relative flex flex-col items-center justify-center ps-7">
      {/* Main Content */}
      <Menu />
      <h1>Đây là trang chủ</h1>
      <Link className="text-lg text-blue-500" href={"/products"}>
        Chuyển tới trang danh sách sản phẩm
      </Link>
    </div>
  );
}

export default HomePage;
