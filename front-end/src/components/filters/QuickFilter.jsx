'use client'
import { useProductProvider } from "@/contexts/ProductProvider";
import { useState } from "react";

export default function QuickFilter() {

	const [contentOrderBy, setContentOrderBy] = useState('desc');
    const { totalElements } = useProductProvider();
    
    const handleQuickFilterProducts = async () => {
		const response = await fetch(
			`http://localhost:8008//api/v1/spu/filter1?contentOrderBy=${contentOrderBy}`,
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
		handleQuickFilterProducts();
	};
    
    return (
        <div className="quiz" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>{totalElements} sản phẩm</p>
            <select
                style={{ border: '1px solid black', borderRadius: '4px' }}
                onChange={(e) => handleContentChange(e.target.value)}
            >
                <option value="" disabled selected hidden>Chọn sắp xếp</option>
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
            </select>
        </div>
    );
}
