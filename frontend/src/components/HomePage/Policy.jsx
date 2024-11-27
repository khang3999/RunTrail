import React from 'react'
import { FaHeadphonesSimple, FaRepeat, FaTruckFast } from 'react-icons/fa6'

export default function Policy() {
  return (
    <div className="policy w-full flex flex-1 h-[400px] py-20">
    <div className="flex flex-1 justify-center items-center">
      <FaTruckFast size={42} />
      <p className="px-4">MIỄN PHÍ VẬN CHUYỂN (BILL &gt; 1M)</p>
    </div>
    <div className="flex flex-1 justify-center items-center">
      <FaRepeat size={42} />
      <p className="px-4">ĐỔI TRẢ TRONG VÒNG 7 NGÀY</p>
    </div>
    <div className="flex flex-1 justify-center items-center">
      <FaHeadphonesSimple size={42} />
      <p className="px-4 ">SẢN PHẨM TRẢI NGHIỆM SẴN TẠI STORE</p>
    </div>
  </div>
  )
}
