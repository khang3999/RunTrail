import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div className="flex items-center justify-center flex-col p-4">
      <h1>Đây là trang chủ</h1>
      <Link className="text-lg text-blue-500" href={"/products"}>
        Chuyển tới trang danh sách sản phẩm
      </Link>
    </div>
  );
}

export default HomePage;
