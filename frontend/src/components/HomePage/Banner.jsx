import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import Link from 'next/link';

const Banner = () => {
    const [dataBanners, setDataBanners] = useState([])
    useEffect(() => {
        // use Axios Instance
        const fetchBannersData = async () => {
            try {
                const response = await fetch(`http://localhost:8008/api/v1/banners`);
                const data = await response.json();
                // console.log(data);
                if (data.statusCode === 200) {
                    setDataBanners(data.metadata);
                } else {
                    console.error("Get banners by statusId failed");
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };
        fetchBannersData();
    }, []);
    return (
        <div className="banner w-full flex-1 h-auto ">

            <Swiper
                autoFocus={true}
                loop={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                    waitForTransition: false
                }}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination,]}
                className="w-full mySwiper custom-swiper"
            >
                {dataBanners &&
                    dataBanners.map((banner) => {
                        console.log(banner.linkTo);
                        
                        return (
                            
                            <SwiperSlide
                                key={banner.id}
                                className="border-1 flex justify-center"
                            >
                                {banner.linkTo !== null ?
                                    <Link href={banner.linkTo}>
                                        <img className="w-full" src={banner.source}></img>
                                    </Link>
                                    :
                                    <div>
                                        <img className="w-full" src={banner.source}></img>
                                    </div>
                                }

                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
}

export default Banner;
