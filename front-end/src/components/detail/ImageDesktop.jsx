import React, { useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@/assets/css/imageDesktop.css'
import ReactImageMagnify from 'react-image-magnify';
export default function ImageDesktop() {
    const perPage = 5
    const data = [
        'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
        'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg',
        'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg',
        'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-04.jpg',
        'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
        'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
        'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
    ]
    const [selectedImage, setSelectedImage] = useState(data[0])
    const handleThumnailClick = (image)=>{
        setSelectedImage(image);
    }
    return (
        <div className='flex w-auto mx-20 flex-row'>
            {/* Image section */}
            <div className='flex flex-col w-1/2 px-10 py-4 border-2 justify-center items-center'>
                {/* Hover image */}
                <div className='w-[80%] mb-8 flex justify-center items-center z-[3]'>
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            // isFluidWidth: true,
                            width: 300,
                            height: 400,
                            src: selectedImage
                        },
                        largeImage: {
                            src: selectedImage,
                            width: 1200,
                            height: 1800
                        },
                        enlargedImageContainerDimensions: {
                            width: '140%',
                            height: '130%'
                        },
                        enlargedImageContainerStyle: {
                            marginLeft: 130
                        }
                    }} />
                </div>

                {/* List images slide*/}
                <div className='w-full stroke-slate-400 border-2 p-4'>
                    <Swiper
                        slidesPerView={perPage}
                        spaceBetween={15}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="h-[80px] w-[100%]"
                    >
                        {data.map((image, index) => {
                            return (
                                <SwiperSlide key={index} className='bg-green-400 border-[1px]'><button onClick={()=>handleThumnailClick(image)}><img style={{ maxWidth: '100%' }} src={image}></img></button></SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
            {/* <ImageDesktopSkeleton></ImageDesktopSkeleton> */}
            {/* Infor section */}
            <div className='bg-orange-300 h-[300px] w-1/2'></div>
        </div>
    )
}
