import React, { useEffect, useState } from 'react';
import '@/assets/css/productItemSkeleton.css'


const TabInformationSkeleton = () => {
    return (
        <div className='mx-[135px] '>
            <div className="grid grid-cols-2 ">
                <div className='grid grid-cols-3 '>
                    <div className={`p-3 text-center border border-slate-300 border-r-transparent border-b-transparent text-[18.3px] font-semibold `}  >
                        <div className='bg-gray-200 w-[50%] h-5 mb-1 skeleton-text'></div>
                    </div>
                    <div className={`p-3 text-center border border-slate-300 border-r-transparent border-b-transparent text-[18.3px] font-semibold `}  >
                        <div className='bg-gray-200 w-[50%] h-5 mb-1 skeleton-text'></div>
                    </div>
                    <div className={`p-3 text-center border border-slate-300  border-b-transparent text-[18.3px] font-semibold `}  >
                        <div className='bg-gray-200 w-[50%] h-5 mb-1 skeleton-text'></div>
                    </div>
                </div>
            </div>
            <div className="px-[130px] py-[24px] border border-slate-300 ">
                <div className='bg-gray-200 w-[80%] h-5 mb-1 skeleton-text'></div>
            </div>
        </div>
    );
}

export default TabInformationSkeleton;
