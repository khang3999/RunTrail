"use client";
import React, { useState } from "react";
import CartItem from "@/components/CartItem";
import { toast } from "react-toastify";

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
    </div>
  );
}
