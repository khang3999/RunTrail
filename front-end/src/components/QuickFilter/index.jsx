'use client'
import { useProductProvider } from "@/contexts/ProductProvider";
import { useState } from "react";

export default function QuickFilter() {

	const [contentOrderBy, setContentOrderBy] = useState('desc');
    const { totalElements } = useProductProvider();
    const handleQuickFilterProducts = async () => {
		const response = await fetch(
			`http://localhost:8008/api/skus/filter?contentOrderBy=${contentOrderBy}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		const data = await response.json();
		console.log(data);
		if (data.length === 0) {
			setProducts([]);
			return;
		} else {
			setProducts(data);
		}
	};
    const handleContentChange = (value) => {
		setContentOrderBy(value);
		handleQuickFilterProducts()
	};
    
    return (
        <div className="quiz" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>{totalElements} sản phẩm</p>
            <select style={{ border: '1px solid black', borderRadius: '4px' }}>
                <option value="" disabled selected hidden>Chọn sắp xếp</option>
                <option value="asc" onClick={(e)=>handleContentChange(e.target.value)}>Giá tăng dần</option>
                <option value="desc" onClick={(e)=>handleContentChange(e.target.value)}>Giá giảm dần</option>
            </select>
        </div>



    )
}
