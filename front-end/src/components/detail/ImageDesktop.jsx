import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@/assets/css/imageDesktop.css'
import ReactImageMagnify from 'react-image-magnify';
import Skeleton from 'react-loading-skeleton';
export default function ImageDesktop({ product, isLoading }) {
    const perPage = 5;
    const [selectedImage, setSelectedImage] = useState(null)
    const [dataImages, setDataImages] = useState([])
    // useEffect(() => {
    //     if (product.images) {
    //         setSelectedImage(product.images[0].imgUrl)
    //     }
    //     console.log(product.images);

    //     setDataImages(product.images)

    // }, [product]);
    const handleThumnailClick = (image) => {
        setSelectedImage(image);
    }
    return (
        <>
            {/* Image section */}
            <div className='w-full flex flex-col border-1 justify-center items-center'>
                {/* Hover image */}
                <div className='w-full flex justify-center items-center z-[3] mb-2'>
                    {
                        isLoading ? <Skeleton width={400} height={500} />
                            :
                            <>
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        // isFluidWidth: true,
                                        width: 400,
                                        height: 500,
                                        src: selectedImage
                                    },
                                    largeImage: {
                                        src: selectedImage,
                                        width: 1200,
                                        height: 1800
                                    },
                                    enlargedImageContainerDimensions: {
                                        width: '120%',
                                        height: '110%'
                                    },
                                    enlargedImageContainerStyle: {
                                        marginLeft: 25
                                    }
                                }} />
                            </>
                    }

                </div>

                {/* List images slide*/}
                <div className='w-full stroke-slate-400 border-2 p-4'>
                    {
                        isLoading ?
                            <div className='flex flex-row justify-between'>
                                <Skeleton width={65} height={65}/>
                                <Skeleton width={65} height={65}/>
                                <Skeleton width={65} height={65}/>
                                <Skeleton width={65} height={65}/>
                                <Skeleton width={65} height={65}/>
                            </div>
                            :
                            <>
                                <Swiper
                                    slidesPerView={perPage}
                                    spaceBetween={15}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="h-[80px] w-[100%]"
                                >
                                    {dataImages && (
                                        dataImages.map((image, index) => {
                                            console.log(1);
                                            console.log(image.imgUrl)
                                            return (
                                                <SwiperSlide key={index} className='border-1'><button onClick={() => handleThumnailClick(image.imgUrl)}><img className='w-full' src={image.imgUrl}></img></button></SwiperSlide>
                                            )
                                        })
                                    )}

                                </Swiper>
                            </>


                    }


                </div>
            </div>
            {/* <ImageDesktopSkeleton></ImageDesktopSkeleton> */}
            {/* Infor section */}
        </>
    )
}
