import { InputNumber } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';

function CartItem({ cart, onQuantityChange, pos, layout }) {
  return (
    layout === 'desktop' ? (
      <tr className="border-b last:border-b-0 hover:bg-gray-100 transition duration-150">
        <td className="py-2 sm:py-4 bg-green-400">
          <img src={cart.image} alt={cart.name} className="sm:w-30 sm:h-20 object-cover mx-auto rounded" />
        </td>
        <td className="py-2 px-2 sm:py-4 sm:px-5 text-xs sm:text-sm md:text-base">{cart.name}</td>
        <td className="py-2 px-2 sm:py-4 sm:px-5 text-center text-gray-600 text-xs sm:text-sm md:text-base">
          ₫{cart.price}
        </td>
        <td className="py-2 px-2 sm:py-4 sm:px-5 text-center">
          <InputNumber
            min={0}
            value={cart.quantity}
            onChange={(value) => onQuantityChange(value, pos)}
            className="w-12 sm:w-16 md:w-20"
          />
        </td>
        <td className="py-2 px-2 sm:py-4 sm:px-5 text-center text-black font-semibold text-xs sm:text-base md:text-lg">
          ₫{(cart.quantity * cart.price).toLocaleString()}
        </td>
        <td
          className="py-2 px-2 sm:py-4 sm:px-5 text-red-500 cursor-pointer text-center text-xs sm:text-sm md:text-base"
          onClick={() => {
            toast.success('Sản phẩm đã được xóa khỏi giỏ hàng');
          }}
        >
          Xóa
        </td>
      </tr>
    ) : (
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-300">
        <img src={cart.image} alt={cart.name} className="w-16 h-16 object-cover rounded" />
        <div className="flex-1 px-4">
          <div className="text-gray-700 font-semibold">{cart.name}</div>
          <div className="text-gray-500">Giá: {cart.price.toLocaleString()}₫</div>
        </div>
        <div className="flex flex-col items-end">
          <InputNumber
            min={1}
            value={cart.quantity}
            onChange={(value) => onQuantityChange(value, pos)}
            className="w-16"
          />
          <button
            onClick={() => {
              toast.success("Sản phẩm đã được xóa khỏi giỏ hàng");
            }}
            className="text-red-500 mt-2"
          >
            Xóa
          </button>
        </div>
      </div>
    )
  );
}

export default CartItem;
