import React from 'react'
import '@/assets/css/productItemSkeleton.css'
import ReactImageMagnify from 'react-image-magnify'

const ImageDesktopSkeleton = () => {
    const perPage = 5

    return (
        <div className='flex flex-col w-1/2 px-10 py-4'>
            {/*  */}
            <div className='w-full mb-8 flex justify-center items-center'>
                <div className='w-[60%] h-[410px] bg-gray-100 skeleton-avatar' >
                </div>
            </div>
            {/* List images slide*/}
            <div className='w-full stroke-slate-400 border-2 p-4'>
                <div className="h-[80px] w-[100%] flex-row flex justify-between">
                    {Array(perPage).fill().map((_,index) => {
                        return (
                            <div key={index} className='bg-gray-100 w-[80px] h-[80px] border-[1px] skeleton-avatar'></div>
                        )
                    })}
                </div>
            </div>
            {/* <ReactImageMagnify
                {...{
                    smallImage: {
                        alt: 'Ảnh nhỏ',
                        isFluidWidth: true,
                        src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg',
                    },
                    largeImage: {
                        src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg',
                        width: 1200,
                        height: 1800,
                    },
                    enlargedImageContainerDimensions: {
                        width: '150%',
                        height: '150%',
                    },
                }}
            /> */}
        </div>
    )
}

export default ImageDesktopSkeleton