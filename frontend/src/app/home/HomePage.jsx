import Link from "next/link";
import React from "react";
import ProductSlider from "@/components/ProductSlider";

function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center flex-col p-4">
      <h1>Đây là trang chủ</h1>
      <Link className="text-lg text-blue-500" href={"/products"}>
        Chuyển tới trang danh sách sản phẩm
      </Link>
      
    </div>
    <div>
    <ProductSlider
      title="SẢN PHẨM MỚI"
      apiUrl="http://localhost:8008/api/v1/new-spu/all"
     />
    <ProductSlider
      title="SẢN PHẨM SALE OFF"
      apiUrl="http://localhost:8008/api/v1/sale-off/all"
    />
    
    </div>
    </>
  );
}

export default HomePage;
