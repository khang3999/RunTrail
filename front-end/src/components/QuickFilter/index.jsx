'use client'
import { useProductProvider } from "@/contexts/ProductProvider";

export default function QuickFilter() {
    const { totalElements } = useProductProvider();
    return (
        <div className="quiz">
            <p>{totalElements} san pham</p>
            {/* Bộ lọc sắp xếp */}
            <select >
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
            </select>
        </div>

    )
}
