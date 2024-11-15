"use client";
import React, { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import { toast } from "react-toastify";
import { Button } from "antd";
import { BsFillCartCheckFill } from "react-icons/bs";
import Cookies from "js-cookie";
import CartItemSkeleton from "@/components/CartItemSkeleton";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function CartPage() {
  //Hàm định dạng giá
  const formatCurrencyVND = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  const [loadingCart, setLoadingCart] = useState(true)
  const [carts, setCarts] = useState([]);

  const readCart = () => {
    setLoadingCart(true)
    const cart = Cookies.get("cart");
    let cartData = [];
    if (cart) {
      cartData = JSON.parse(cart);
      // setLoadingCart(false)
      setCarts(cartData)
    }

  }
  useEffect(() => {
    readCart()
  }, [])


  const handleQuantityChange = (value, index) => {
    const updatedCarts = carts.map((cart, i) =>
      i === index ? { ...cart, quantity: value } : cart
    );
    setCarts(updatedCarts);
  };

  return (
    <div className="py-5 px-4 sm:px-6 md:px-10 lg:px-20 w-full flex flex-col bg-gray-50">


      {/* Tổng tiền đơn hàng */}
      <div className="flex flex-row justify-between items-center">
        <span className="uppercase text-xl sm:text-2xl md:text-3xl font-bold py-3 sm:py-4 md:py-5 text-gray-700">
          Giỏ hàng
        </span>
        <span className="text-lg sm:text-2xl font-bold mx-3">{`Tổng tiền: ${formatCurrencyVND(300000)}`}</span>
      </div>

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
            {!loadingCart ?
              (carts.map((cart, index) => (
                <CartItem
                  key={index}
                  cart={cart}
                  onQuantityChange={handleQuantityChange}
                  pos={index}
                  layout="desktop"
                />
              )))
              :
              (Array(5).fill().map((cart, index) => (
                <CartItemSkeleton layout="desktop" />
              )))
            }
          </tbody>
        </table>
      </div>

      {/* Mobile List Layout */}
      <div className="block md:hidden space-y-4">
        {!loadingCart ?
          (carts.map((cart, index) => (
            <CartItem
              key={index}
              cart={cart}
              onQuantityChange={handleQuantityChange}
              pos={index}
              layout="mobile"
            />
          )))
          :
          (Array(5).fill().map((cart, index) => (
            <CartItemSkeleton layout="mobile" />
          )))
        }
      </div>


      {/* Button  */}
      <div className="flex justify-end space-x-4 my-6">


        {/* From Uiverse.io by AKAspidey01  */}
        <Button
          className="bg-white text-center w-[218px] rounded relative group"
        >
          <div
            className="bg-green-400 rounded w-1/6 flex items-center justify-center absolute left-1 group-hover:w-[209px] z-10 duration-500"
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
          <p className="px-10 translate-x-2">Tiếp tục mua hàng</p>
        </Button>

        {/* <Button>Tiếp tục mua hàng</Button> */}
        <Button disabled={carts.length <= 0 ? true: false} icon={<BsFillCartCheckFill size={22} />} >Đặt hàng</Button>
      </div>
    </div>
  );
}
