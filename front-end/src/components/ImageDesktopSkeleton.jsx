import React from 'react'
import '@/assets/css/productItemSkeleton.css'

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
        </div>
    )
}

export default ImageDesktopSkeleton