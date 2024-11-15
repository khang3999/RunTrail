"use client";
import React, { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useAppProvider } from "@/contexts/AppProvider";

export default function CartPage() {
   const [carts, setCarts] = useState([
      {
         image:
            "https://assets.editorial.aetnd.com/uploads/2016/11/donald-trump-gettyimages-687193180.jpg",
         name: "Giày 1",
         price: 300000,
         quantity: 1,
      },
      {
         image:
            "https://assets.editorial.aetnd.com/uploads/2016/11/donald-trump-gettyimages-687193180.jpg",
         name: "Giày 2",
         price: 300000,
         quantity: 1,
      },
   ]);

   // Provider
   const { alertMessage, setAlertMessage, alertType, setAlertType } = useAppProvider();

   const [isModalVisible, setIsModalVisible] = useState(false);

   const handleQuantityChange = (value, index) => {
      const updatedCarts = carts.map((cart, i) =>
         i === index ? { ...cart, quantity: value } : cart,
      );
      setCarts(updatedCarts);
   };

   const handleOrderClick = () => {
      const firstname = localStorage.getItem("firstName");
      const lastname = localStorage.getItem("lastName");
      const phone = localStorage.getItem("phone");
      if (!firstname || !phone || !lastname) {
         setIsModalVisible(true);
         toast.error("Nhập thông tin khách hàng");
      } else {
         toast.success("Đơn hàng đang được xử lý");
         window.location.href = "/order";
      }
   };

   const handleModalOk = () => {
      const firstname = document.getElementById("userFirstName").value;
      const lastname = document.getElementById("userLastName").value;
      const phone = document.getElementById("userPhone").value;

      const phoneRegex = /^[0-9]{10}$/;

      if (firstname && lastname && phone && phoneRegex.test(phone)) {
         localStorage.setItem("firstName", firstname);
         localStorage.setItem("lastName", lastname);
         localStorage.setItem("phone", phone);
         setIsModalVisible(false);
         toast.success("Tài khoản đã được lưu, đơn hàng đang được xử lý");
         document.getElementById("userFirstName").value = "";
         document.getElementById("userLastName").value = "";
         document.getElementById("userPhone").value = "";
         window.location.href = "/order";
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

   useEffect(() => {
      console.log("alertMessage", alertMessage);
      if (alertMessage !== "") {
         if (alertType === "success") {
            toast.success(alertMessage);
         }
         if (alertType === "error") {
            toast.error(alertMessage);
         }

         setAlertMessage("");
         setAlertType("none");
      }
   }, [alertMessage]);

   const isCartEmpty = carts.length === 0;

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
                     <th className="py-2 sm:py-3 px-2 sm:px-5 text-center">
                        Hình ảnh
                     </th>
                     <th className="py-2 sm:py-3 px-2 sm:px-5 text-center sm:text-start">
                        Tên sản phẩm
                     </th>
                     <th className="py-2 sm:py-3 px-2 sm:px-5 text-center">Đơn giá</th>
                     <th className="py-2 sm:py-3 px-2 sm:px-5 text-center">
                        Số lượng
                     </th>
                     <th className="py-2 sm:py-3 px-2 sm:px-5 text-center">
                        Thành tiền
                     </th>
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
            <button
               className="bg-white text-center rounded relative group"
               type="button"
               disabled={isCartEmpty}
               onClick={handleOrderClick}
            >
               <div className="bg-green-400  bottom-0 top-0 rounded w-1/6 flex items-center justify-center absolute left-1 group-hover:w-full z-10 duration-500">
                  <FontAwesomeIcon icon={faChevronCircleLeft} className="text-white" />
               </div>
               <p className="px-10 sm:text-sm text-xs">Tiếp tục mua hàng</p>
            </button>

            <Button
               icon={<BsFillCartCheckFill size={22} />}
               onClick={handleOrderClick}
               disabled={isCartEmpty}
            >
               Đặt hàng
            </Button>
         </div>

         {/* Modal for entering user details */}
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
                  id="userFirstName"
                  type="text"
                  placeholder="Nhập Họ"
                  className="p-2 border border-gray-300 rounded"
               />
               <input
                  id="userLastName"
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
