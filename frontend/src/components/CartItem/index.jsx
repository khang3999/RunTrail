"use client";
import { Button, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

function CartItem({ cart, onQuantityChange, pos, layout, onDeleteItem }) {
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   // Format VND currency
   const formatCurrencyVND = (amount) => {
      return amount?.toLocaleString("vi-VN", {
         style: "currency",
         currency: "VND",
      });
   };

   // Function to calculate the discounted price
   const getDiscountedPrice = (cart) => {
      const discount = cart.spu?.discount || 0; // Default discount to 0 if not available
      const originalPrice = cart.skuPrice;
      const discountAmount = (originalPrice * discount) / 100;
      return originalPrice - discountAmount;
   };

   function generateSlug(cart) {
      const cartName = cart.skuName;
      const attributes = JSON.parse(cart.skuAttri);
      const attribute = Object.values(attributes).join(" ");
      return `${cartName} ${attribute}`;
   }

   const discountedPrice = getDiscountedPrice(cart);

   return layout === "desktop" ? (
      <tr className="border-b last:border-b-0 hover:bg-gray-50 transition duration-150">
         <td className="py-4">
            <img
               src={
                  cart.spu.images?.length > 0
                     ? cart.spu.images[0]?.imgUrl
                     : "https://via.placeholder.com/150"
               }
               alt={generateSlug(cart)}
               className="w-24 h-16 object-cover mx-auto rounded-md"
            />
         </td>
         <td className="py-4 px-4 text-gray-700">
            <p className="font-medium">{generateSlug(cart)}</p>
         </td>
         <td className="py-4 px-4 text-center">
            <div className="flex flex-col items-center space-y-1">
               <span className="text-lg font-semibold text-emerald-500">
                  {formatCurrencyVND(discountedPrice)}
               </span>
               <span className="text-sm line-through text-gray-400">
                  {formatCurrencyVND(cart.skuPrice)}
               </span>
            </div>
         </td>
         <td className="py-4 px-4 text-center">
            <div className="flex items-center justify-between border border-gray-300 rounded-md">
               <button
                  onClick={() => onQuantityChange(Math.max(cart.quantity - 1, 1), pos)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-r border-gray-300"
               >
                  -
               </button>
               <input
                  type="number"
                  value={cart.quantity}
                  onChange={(e) => {
                     const value = Math.max(Number(e.target.value), 1);
                     onQuantityChange(value, pos);
                  }}
                  className="w-12 text-center text-gray-700 focus:outline-none"
               />
               <button
                  onClick={() => onQuantityChange(cart.quantity + 1, pos)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-l border-gray-300"
               >
                  +
               </button>
            </div>
         </td>
         <td className="py-4 px-4 text-center text-gray-800">
            {formatCurrencyVND(cart.quantity * discountedPrice)}
         </td>
         <td className="py-4 px-4 text-center">
            {isClient && (
               <Tooltip title="Xóa" color="red">
                  <Button
                     danger
                     type="primary"
                     icon={<IoTrashOutline size={20} />}
                     onClick={() => onDeleteItem(cart.id)}
                  />
               </Tooltip>
            )}
         </td>
      </tr>
   ) : (
      <div className="flex flex-row items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
         <img
            src={
               cart.spu.images.length > 0
                  ? cart.spu.images[0]?.imgUrl
                  : "https://via.placeholder.com/150"
            }
            alt={generateSlug(cart)}
            className="w-16 h-16 object-cover rounded-md"
         />
         <div className="flex-1 px-4">
            <p className="font-semibold text-gray-800">{generateSlug(cart)}</p>
            <p className="text-gray-500 mt-1">
               Giá: {formatCurrencyVND(discountedPrice)}
            </p>
         </div>
         <div className="flex flex-col items-center sm:ml-4">
            <div className="flex items-center border border-gray-300 rounded-md">
               <button
                  onClick={() =>
                     onQuantityChange(Math.max(cart.quantity - 1, 1), pos)
                  }
                  className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-r border-gray-300"
               >
                  -
               </button>
               <input
                  type="number"
                  value={cart.quantity}
                  onChange={(e) => {
                     const value = Math.max(Number(e.target.value), 1);
                     onQuantityChange(value, pos);
                  }}
                  className="w-8 text-center text-gray-700 focus:outline-none"
               />
               <button
                  onClick={() => onQuantityChange(cart.quantity + 1, pos)}
                  className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-l border-gray-300"
               >
                  +
               </button>
            </div>
            <button
               onClick={() => onDeleteItem(cart.id)}
               className="text-red-500 mt-2 text-sm"
            >
               {isClient && (
                  <Tooltip title="Xóa" color="red">
                     <Button
                        danger
                        type="primary"
                        icon={<IoTrashOutline size={20} />}
                     />
                  </Tooltip>
               )}
            </button>
         </div>
      </div>
   );
}

export default CartItem;
