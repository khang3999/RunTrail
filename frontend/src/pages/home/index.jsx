import Link from "next/link";
import BrandList from "@/components/HomePage/BrandList";
import Policy from "@/components/HomePage/Policy";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center flex-col p-4">
      <h1>Đây là trang chủ</h1>
      <Link className="text-lg text-blue-500" href={"/product"}>
        Chuyển tới trang danh sách sản phẩm
      </Link>
      <BrandList></BrandList>
      <Policy></Policy>
    </div>
  )
}