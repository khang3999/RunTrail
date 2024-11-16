"use client";
import { Button, InputNumber, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'


function CartItem({ cart, onQuantityChange, pos, layout, onDeleteItem }) {
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   // Format VND currency
   const formatCurrencyVND = (amount) => {
      return amount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
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
      const attribute = Object.values(attributes).join(' ');
      return `${cartName} ${attribute}`;
   }   

   // Get the actual price after applying discount
   const discountedPrice = getDiscountedPrice(cart);
   
   return (
      layout === 'desktop' ? (
         <tr className="border-b last:border-b-0 hover:bg-gray-100 transition duration-150">
            <td className="py-2 sm:py-4">
               <img
                  src={cart.images?.length > 0 ? cart.images[0]?.imageUrl : 'https://via.placeholder.com/150'}
                  alt={generateSlug(cart)}
                  className="sm:w-30 sm:h-20 object-cover mx-auto rounded"
               />
            </td>
            <td className="py-2 px-2 sm:py-4 sm:px-5 text-xs sm:text-sm md:text-base">{generateSlug(cart)}</td>
            <td className="py-2 px-2 sm:py-4 sm:px-5 text-center text-gray-600 text-xs sm:text-sm md:text-base">
               {formatCurrencyVND(discountedPrice)}
            </td>
            <td className="py-2 px-2 sm:py-4 sm:px-5 text-center">
               <InputNumber
                  min={1}
                  value={cart.quantity}
                  onChange={(value) => onQuantityChange(value, pos)}
                  className="w-12 sm:w-16 md:w-20"
               />
            </td>
            <td className="py-2 px-2 sm:py-4 sm:px-5 text-center text-black font-semibold text-xs sm:text-base md:text-lg">
               {formatCurrencyVND(cart.quantity * discountedPrice)}
            </td>
            <td
               className="py-2 px-2 sm:py-4 sm:px-5 text-red-500 cursor-pointer text-center text-xs sm:text-sm md:text-base"
               onClick={() => onDeleteItem(cart.id)}
            >
               {isClient && (
                  <Tooltip title="Xóa" color="red">
                     <Button danger type="primary" icon={<IoTrashOutline size={22} />}></Button>
                  </Tooltip>
               )}
            </td>
         </tr>
      ) : (
         <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-300">
            <img
               src={cart.images && cart.images?.length > 0 ? cart.images[0]?.imageUrl : 'https://via.placeholder.com/150'}
               alt={generateSlug(cart)}
               className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 px-4">
               <div className="text-gray-700 font-semibold">{generateSlug(cart)}</div>
               <div className="text-gray-500">Giá: {formatCurrencyVND(discountedPrice)}</div>
            </div>
            <div className="flex flex-col items-center">
               <InputNumber
                  min={1}
                  value={cart.quantity}
                  onChange={(value) => onQuantityChange(value, pos)}
                  className="w-16"
                  controls={true}
               />
               <button
                  onClick={() => onDeleteItem(cart.id)}
                  className="text-red-500 mt-2"
               >
                  {isClient && (
                     <Tooltip title="Xóa" color="red">
                        <Button danger type="primary" icon={<IoTrashOutline size={22} />}></Button>
                     </Tooltip>
                  )}
               </button>
            </div>
         </div>
      )
   );
}

export default CartItem;
