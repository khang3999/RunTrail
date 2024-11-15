"use client";
import React, { useState, useEffect } from "react";
import CartItem from "@/components/CartItem";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { BsFillCartCheckFill } from "react-icons/bs";
import Cookies from "js-cookie";

export default function CartPage() {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch data based on skuId
  useEffect(() => {
    const cartCookie = Cookies.get("cart");
    if (cartCookie) {
      const parsedCart = JSON.parse(cartCookie);
      const fetchCartData = async () => {
        try {
          const responses = await Promise.all(
            parsedCart.map((item) =>
              fetch(`http://localhost:8008/api/v1/sku/${item.skuId}`).then((res) => res.json())
            )
          );
          const enrichedCarts = responses.map((data, index) => ({
            ...data,
            quantity: parsedCart[index].quantity,
          }));
          setCarts(enrichedCarts);
        } catch (error) {
          toast.error("Không thể tải dữ liệu giỏ hàng");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCartData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleQuantityChange = (value, index) => {
    // Cập nhật số lượng trong carts
    const updatedCarts = carts.map((cart, i) =>
      i === index ? { ...cart, quantity: value } : cart
    );
  
    // Chỉ lấy id và quantity để lưu vào cookie
    const cookieData = updatedCarts.map(({ id, quantity }) => ({ id, quantity }));
    Cookies.set("cart", JSON.stringify(cookieData));
  
    setCarts(updatedCarts);
  };  

  const handleOrderClick = () => {
    const name = localStorage.getItem("name");
    const phone = localStorage.getItem("phone");
    if (!name || !phone) {
      setIsModalVisible(true);
      toast.error("Nhập thông tin khách hàng");
    } else {
      toast.success("Đơn hàng đang được xử lý");
    }
  };

  const handleModalOk = () => {
    const name = document.getElementById("userName").value;
    const phone = document.getElementById("userPhone").value;
    const phoneRegex = /^[0-9]{10}$/;

    if (name && phone && phoneRegex.test(phone)) {
      localStorage.setItem("name", name);
      localStorage.setItem("phone", phone);
      setIsModalVisible(false);
      toast.success("Tài khoản đã được lưu, đơn hàng đang được xử lý");
      document.getElementById("userName").value = "";
      document.getElementById("userPhone").value = "";
    } else {
      if (!phoneRegex.test(phone)) {
        toast.error("Số điện thoại không hợp lệ");
      } else {
        toast.error("Vui lòng nhập đầy đủ thông tin");
      }
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const isCartEmpty = carts.length === 0;

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

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

      {/* Button */}
      <div className="flex justify-end space-x-4 my-6">
        <Button
          icon={<BsFillCartCheckFill size={22} />}
          onClick={handleOrderClick}
          disabled={isCartEmpty}
        >
          Đặt hàng
        </Button>
      </div>

      {/* Modal */}
      <Modal
        title="Nhập thông tin người dùng"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Lưu thông tin"
        cancelText="Hủy"
      >
        <div className="flex flex-col space-y-4">
          <input
            id="userName"
            type="text"
            placeholder="Nhập tên"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            id="userPhone"
            type="text"
            placeholder="Nhập số điện thoại"
            className="p-2 border border-gray-300 rounded"
            pattern="[0-9]{10}"
          />
        </div>
      </Modal>
    </div>
  );
}
