import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '@/assets/css/homePage.css'
import Link from 'next/link';
import { useProductProvider } from '@/contexts/ProductProvider';

export default function BrandList() {
    const [dataBrands, setDataBrands] = useState([])
    const { setCategoryId, setSelectedBrands,  } = useProductProvider()
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

    const handleClickOnBrandItem = (brandId) => {
        const selectedBrands = [brandId]
        setCategoryId(-1)
        setSelectedBrands(selectedBrands)
        // setTempSelectedBrands(selectedBrands)
    }

    return (
        <div className="banner w-full flex-1">
            <Swiper
                autoFocus={true}
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
                            <Link href='/product' onClick={()=>handleClickOnBrandItem(brand.id)}>
                                <img className="w-full" src={brand.brandLogo}></img>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
