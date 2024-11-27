import { Carousel } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import AxiosInstance from "@/utils/axiosInstance"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import '@/assets/css/homePage.css'

function HomePage() {
  const [dataBrands, setDataBrands] = useState([])
  useEffect(() => {
    // use Axios Instance
    const fetchBrandsData = async () => {
      try {
        const response = await fetch(`http://localhost:8008/api/v1/brands/by-status?statusId=1`);
        const data = await response.json();
        console.log(data);
        if (data.statusCode === 200) {
          // Kiểm tra dữ liệu và lọc theo `status = 1`
          const filteredData = data.metadata.filter((brand) => brand.status === 1);
          console.log(filteredData);
          setDataBrands(filteredData);
        } else {
          console.error("Get brands by statusId failed");
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrandsData();
  }, []);
  // useEffect(() => {
  //   console.log(dataBrands)
  // }, [dataBrands])
  return (
    <div className="flex items-center justify-center flex-col p-4">
      <h1>Đây là trang chủ</h1>
      <Link className="text-lg text-blue-500" href={"/products"}>
        Chuyển tới trang danh sách sản phẩm
      </Link>

      <div className="banner w-full flex-1 h-[400px]">
        <Swiper
          loop={true}
          spaceBetween={30}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            waitForTransition: false
          }}
          slidesPerView={6}
          breakpoints={{
            // 1024: {
            //   slidesPerView: 6, // Hiển thị 4 slide trên tablet
            // },
            1024: {
              slidesPerView: 6, // Hiển thị 4 slide trên mobile
            },
            0: {
              slidesPerView: 4, // Hiển thị 4 slide cho màn hình nhỏ hơn 768px
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination,]}
          className="mySwiper custom-swiper">
          {dataBrands && dataBrands.map(brand => {
            return (
              <SwiperSlide key={brand.id} virtualIndex={brand.id}>
                <Link href='#'>
                  <img className="w-full" src={brand.brandLogo}></img>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

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
