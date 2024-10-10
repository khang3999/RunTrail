'use client'
import { useProductProvider } from "@/contexts/ProductProvider";

export default function QuickFilter() {
    const { totalElements } = useProductProvider();
    const handleQuickFilter = () =>{
        
    }
    return (
        <div className="quiz" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p>{totalElements} sản phẩm</p>
        <select style={{border:'1px solid black', borderRadius:'4px'}}>
            <option value="" disabled selected hidden>Chọn sắp xếp</option>
            <option value="asc" >Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
        </select>
    </div>
    


    )
}
