import { Carousel } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BrandList from "@/components/HomePage/BrandList";
import Policy from "@/components/HomePage/Policy";

function HomePage() {
  return (
    <div className="flex items-center justify-center flex-col p-4">
      <h1>Đây là trang chủ</h1>
      <Link className="text-lg text-blue-500" href={"/products"}>
        Chuyển tới trang danh sách sản phẩm
      </Link>

      <BrandList></BrandList>
      <Policy></Policy>
    </div>
  );
}

{/* <Swiper

  spaceBetween={15}
  pagination={{
    clickable: true,
  }}
  modules={[Pagination]}
  className="w-full h-[500px]"
>
  {dataBrands &&
    dataBrands.map((brand) => {
      return (
        <SwiperSlide
          key={banner.id}
          className="border-1 flex justify-center"
        >
          <button>
            <img className="w-full" src={brand.brandLogo}></img>
          </button>

        </SwiperSlide>
      );
    })}
</Swiper> */}

export default HomePage;
