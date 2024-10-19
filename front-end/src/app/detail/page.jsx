import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import ImageDesktopSkeleton from '@/components/ImageDesktopSkeleton'
import smallImage from '../../assets/images/adidas-barricade-13.png';
import ReactImageMagnify from 'react-image-magnify'

export default function DetailProduct() {
  const [hoveredImage, setHoveredImage] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const perPage = 5
  const data = [
    "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg",
    "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg",
    "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-04.jpg",
    "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    // "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    // "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
  ]
  return (
    <>
      <div>DetailProduct</div>
      {/* Show image in desktop */}
      <div className='flex w-auto mx-14'>
        {/* Image section */}
        <div className='flex flex-col w-1/2 px-10 py-4'>
          {/*  */}
          <div className='w-full mb-8 flex justify-center items-center'>
            <div className='w-[60%]'>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    src: smallImage,
                    alt: 'Ảnh nhỏ',
                    width: 400,
                    height: 400
                  },
                  largeImage: {
                    src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    // width: 750,
                    // height: 1000,
                    width: 1000,
                    height: 1000,
                  },
                  // enlargedImageContainerDimensions: {
                  //   width: '140%',
                  //   height: '140%',
                  // },
                  // enlargedImageContainerStyle: {
                  //   border: '1px solid black',
                  //   backgroundColor: '#fff',
                  //   zIndex: 10      // Đặt chiều cao 100% để phù hợp với khung
                  // },
                  enlargedImageStyle: {
                    objectFit: 'fill',  // Điều chỉnh cách ảnh hiển thị
                    width: '100%',          // Đặt chiều rộng 100% để phù hợp với khung
                    height: '100%',   
                  }
                }}
              />
            </div>
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
                  <SwiperSlide key={index} className='bg-green-400 border-[1px]'><button onClick={() => console.log("press")}><img src={image}></img></button></SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
        {/* <ImageDesktopSkeleton></ImageDesktopSkeleton> */}
        {/* Infor section */}
        <div className='flex-1 bg-orange-300'></div>

        {/* Image hover */}
        {hoveredImage && (
          <div className='absolute h-[560px] border-4 border-gray-600 left-1/2 overflow-hidden'>
            <img
              className='h-full scale-[1.7]'
              src='https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg'
              style={{
                transform: mousePosition.x + 10, // Offset for better visibility
                top: mousePosition.y - 300, // Offset to move image above mouse
                height: '560px',
                transition: 'left 0.1s ease, top 0.1s ease', // Smooth transition
              }}>
            </img>
          </div>
        )}
      </div>
    </>
  )
}
