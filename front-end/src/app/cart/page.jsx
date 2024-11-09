"use client";
import React, { useState } from "react";
import CartItem from "@/components/CartItem";
import { toast } from "react-toastify";
import { Button } from "antd";
import { BsFillCartCheckFill } from "react-icons/bs";

export default function CartPage() {
  const [carts, setCarts] = useState([
    {
      image: "https://assets.editorial.aetnd.com/uploads/2016/11/donald-trump-gettyimages-687193180.jpg",
      name: "Giày 1",
      price: 300000,
      quantity: 1,
    },
    {
      image: "https://assets.editorial.aetnd.com/uploads/2016/11/donald-trump-gettyimages-687193180.jpg",
      name: "Giày 2",
      price: 300000,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (value, index) => {
    const updatedCarts = carts.map((cart, i) =>
      i === index ? { ...cart, quantity: value } : cart
    );
    setCarts(updatedCarts);
  };

  return (
    <div className="py-5 px-4 sm:px-6 md:px-10 lg:px-20 w-full flex flex-col bg-gray-50">
      <span className="uppercase text-xl sm:text-2xl md:text-3xl font-bold py-3 sm:py-4 md:py-5 text-gray-700">
        Giỏ hàng
      </span>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-left border-collapse border border-gray-300 shadow-sm rounded-lg">
          <thead className="bg-gray-200 text-gray-700 sm:uppercase text-xs sm:text-sm md:text-base">
            <tr>
              <th className="py-2 sm:py-3 px-2 sm:px-5 text-center">Hình ảnh</th>
              <th className="py-2 sm:py-3 px-2 sm:px-5 text-center sm:text-start">Tên sản phẩm</th>
              <th className="py-2 sm:py-3 px-2 sm:px-5 text-center">Đơn giá</th>
              <th className="py-2 sm:py-3 px-2 sm:px-5 text-center">Số lượng</th>
              <th className="py-2 sm:py-3 px-2 sm:px-5 text-center">Thành tiền</th>
              <th className="py-2 sm:py-3 px-2 sm:px-5"></th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm sm:text-base">
            {carts.map((cart, index) => (
              <CartItem
                key={index}
                cart={cart}
                onQuantityChange={handleQuantityChange}
                pos={index}
                layout="desktop"
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List Layout */}
      <div className="block md:hidden space-y-4">
        {carts.map((cart, index) => (
          <CartItem
            key={index}
            cart={cart}
            onQuantityChange={handleQuantityChange}
            pos={index}
            layout="mobile"
          />
        ))}
      </div>

      {/* Button  */}
      <div className="flex justify-end space-x-4 my-6">
       {/* From Uiverse.io by AKAspidey01  */}
        <button
          className="bg-white text-center rounded relative group"
          type="button"
        >
          <div
            className="bg-green-400 rounded w-1/6 flex items-center justify-center absolute left-1 group-hover:w-full z-10 duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#000000"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#000000"
              ></path>
            </svg>
          </div>
          <p className="px-10">Tiếp tục mua hàng</p>
        </button>

        {/* <Button>Tiếp tục mua hàng</Button> */}
        <Button icon={<BsFillCartCheckFill size={22} />} >Đặt hàng</Button>
      </div>
    </div>
  );
}
