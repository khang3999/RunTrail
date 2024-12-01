import React from 'react'
import { FaHeadphonesSimple, FaRepeat, FaTruckFast } from 'react-icons/fa6'

export default function Policy() {
    return (
        <div className="policy w-full flex flex-col md:flex-row h-auto flex-1 py-10 md:py-20">
            <div className="flex flex-col md:flex-row flex-1 justify-center items-center">
                <FaTruckFast size={42} />
                <p className="md:px-4 pt-3 md:pt-0">MIỄN PHÍ VẬN CHUYỂN (BILL &gt; 1M)</p>
            </div>
            <div className="flex flex-col md:flex-row flex-1 justify-center py-10 md:py-0 items-center">
                <FaRepeat size={42} />
                <p className="md:px-4 pt-3 md:pt-0">ĐỔI TRẢ TRONG VÒNG 7 NGÀY</p>
            </div>
            <div className="flex flex-col md:flex-row flex-1 justify-center items-center">
                <FaHeadphonesSimple size={42} />
                <p className="md:px-4 pt-3 md:pt-0">SẢN PHẨM TRẢI NGHIỆM SẴN TẠI STORE</p>
            </div>
        </div>
    )
}
