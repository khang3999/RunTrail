import React, { useEffect, useState } from 'react';

const TabInformation = (props) => {
    const [tab, setTab] = useState(1);
    useEffect(()=>{
        console.log('tab',tab);
    },[tab])
    return (
        <div className='mx-[135px]'>
            <div className="grid grid-cols-2">
                <div className='grid grid-cols-3'>
                    <div className={`p-3 text-center border border-slate-300 border-r-transparent border-b-transparent text-[18.3px] font-semibold ${tab === 1 ? 'bg-violet-500 text-white' : ''}`} 
                        onClick={() => setTab(1)} >Mô tả chi tiết</div>
                    <div className={`p-3 text-center border border-slate-300 border-r-transparent border-b-transparent text-[18.3px] font-semibold ${tab === 2 ? 'bg-violet-500 text-white' : ''}`} 
                        onClick={() => setTab(2)}>Bình luận</div>
                    <div className={`p-3 text-center border border-slate-300 border-b-transparent text-[18.3px] font-semibold ${tab === 3 ? 'bg-violet-500 text-white' : ''}`} 
                        onClick={() => setTab(3)}>Đánh giá</div>
                </div>
            </div>
            <div className="px-[130px] py-[24px] border border-slate-300">
               <div className={`${tab === 1 ? 'block' : 'hidden'}`}></div>
               <div className={`${tab === 2 ? 'block' : 'hidden'} text-stone-400`}>Tính năng đang phát triển</div>
               <div className={`${tab === 3 ? 'block' : 'hidden'} text-stone-400`}>Tính năng đang phát triển</div>
               
            </div>
        </div>
    );
}

export default TabInformation;
