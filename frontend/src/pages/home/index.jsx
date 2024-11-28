import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex items-center justify-center flex-col p-4">
        <h1>Đây là trang chủ</h1>
        <Link className="text-lg text-blue-500" href={"/product"}>
          Chuyển tới trang danh sách sản phẩm
        </Link>
      </div>
    )
}