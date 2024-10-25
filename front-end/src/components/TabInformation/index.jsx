import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import '@/assets/css/markdownImage.css';

const TabInformation = ({ product, isLoading }) => {
    const [tab, setTab] = useState(1);
    useEffect(() => {
        console.log('tab', product.spuDescription);
    }, [tab])
    return (
        <div className='mx-[135px] '>
            <div className="grid grid-cols-2">
                <div className='grid grid-cols-3'>

                    <div className={`p-3 text-center border border-slate-300 border-r-transparent border-b-transparent text-[18.3px] font-semibold ${(tab === 1 && !isLoading) ? 'bg-violet-500 text-white' : ''}`}
                        onClick={() => setTab(1)} >{isLoading ? <Skeleton className='h-5' /> : <p>Bình luận</p>}
                    </div>

                    <div className={`p-3 text-center border border-slate-300 border-r-transparent border-b-transparent text-[18.3px] font-semibold ${tab === 2 ? 'bg-violet-500 text-white' : ''}`}
                        onClick={() => setTab(2)}>{isLoading ? <Skeleton className='h-5' /> : <p>Bình luận</p>}
                    </div>

                    <div className={`p-3 text-center border border-slate-300 border-b-transparent text-[18.3px] font-semibold ${tab === 3 ? 'bg-violet-500 text-white' : ''}`}
                        onClick={() => setTab(3)}>{isLoading ? <Skeleton className='h-5' /> : <p>Đánh giá</p>}</div>
                </div>
            </div>
            <div className="px-[130px] py-[24px] border border-slate-300">
                {isLoading ? <Skeleton className='h-[200px]' /> :
                    <div className={`${tab === 1 ? 'block' : 'hidden'} mark-down-wrap`}><ReactMarkdown>{product.spuDescription}</ReactMarkdown></div>
                }
                <div className={`${tab === 2 ? 'block' : 'hidden'} text-stone-400`}>Tính năng đang phát triển</div>
                <div className={`${tab === 3 ? 'block' : 'hidden'} text-stone-400`}>Tính năng đang phát triển</div>

            </div>
        </div>
    );
}

export default TabInformation;
