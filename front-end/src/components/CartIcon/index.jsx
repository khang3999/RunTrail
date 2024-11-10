import { CiShoppingCart } from "react-icons/ci";

export default function CartIcon({cartTotal=0}) {
    return (
        <a href="#" className={"flex items-center"}>
          <CiShoppingCart color="white" size={30} />
          <span className={"text-[10px] p-1 bg-red-500 text-white rounded-full h-[20px] w-[20px] flex justify-center items-center text-xs ml-[-8px] mt-[-10px]"}>{cartTotal > 99 ? "99+":cartTotal}</span>
        </a>
    )
}