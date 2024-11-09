import { InputNumber } from 'antd'
import React from 'react'
import { toast } from 'react-toastify'

function CartItem({ cart, onQuantityChange, pos }) {
  return (
    <>
      <tr className="border-b last:border-b-0 hover:bg-gray-100 transition duration-150">
        <td className="py-2 sm:py-4 bg-green-400 ">
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
          ₫{(cart.quantity * cart.price)}
        </td>
        <td
          className="py-2 px-2 sm:py-4 sm:px-5 text-red-500 cursor-pointer text-center text-xs sm:text-sm md:text-base"
          onClick={() => {
            toast.success('Xóa thành công!')
          }}
        >
          Xóa
        </td>
      </tr>
    </>
  )
}

export default CartItem