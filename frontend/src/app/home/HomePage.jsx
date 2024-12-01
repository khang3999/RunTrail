import { Carousel } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BrandList from "@/components/HomePage/BrandList";
import Banner from "@/components/HomePage/Banner";
import Policy from "@/components/HomePage/Policy";
import Swiper from "swiper";


function HomePage() {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1>Đây là trang chủ</h1>
      <Link className="text-lg text-blue-500" href={"/products"}>
        Chuyển tới trang danh sách sản phẩm
      </Link>
      <Banner></Banner>
      <BrandList></BrandList>
      <Policy></Policy>
    </div>
  );
}



export default HomePage;
