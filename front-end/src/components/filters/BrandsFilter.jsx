'use client';
import React, { useEffect, useState } from 'react';
import { useProductProvider } from '@/contexts/ProductProvider';

const BrandsFilter = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const { setProducts } = useProductProvider(); 

    useEffect(() => {
        const fetchBrandsData = async () => {
            const res = await fetch('http://localhost:8008/api/brands', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            console.log(data);
            
            setBrands(data); 
        };
        fetchBrandsData();
    }, []);

    const handleBrandChange = (brandId) => {
        if (selectedBrands.includes(brandId)) {
            setSelectedBrands(selectedBrands.filter((id) => id !== brandId)); 
        } else {
            setSelectedBrands([...selectedBrands, brandId]);
        }
    };

    // Hàm lọc sản phẩm theo các tiêu chí đã chọn
    const filterProductsByBrand = async () => {
        const params = new URLSearchParams();

        if (selectedBrands.length > 0) {
            const selected = selectedBrands.join(',');
            params.append('brandId', selected);
        }

        // Bạn có thể thêm các tham số khác vào đây
        // Ví dụ, nếu có param price range:
        // params.append('priceMin', 100);
        // params.append('priceMax', 1000);

        const queryString = params.toString();

        const res = await fetch(
            `http://localhost:8008/api/v1/spu/filter?${queryString}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await res.json();
        console.log(data);
        
        setProducts(data.metadata.content);
    };

    return (
        <div className="w-full max-w-lg mx-auto text-black">
            <div className="p-4 bg-white rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Tìm kiếm thương hiệu"
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                        <div key={brand.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`brand-${brand.id}`}
                                checked={selectedBrands.includes(brand.id)}
                                onChange={() => handleBrandChange(brand.id)}
                                className="mr-2"
                            />
                            <label htmlFor={`brand-${brand.id}`} className="flex-grow text-sm">
                                {brand.brandName}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="uppercase mt-4 py-3 rounded-lg border-gray-300 w-full text-black border transition-all"
                onClick={() => filterProductsByBrand()}
            >
                Search
            </button>
        </div>
    );
};

export default BrandsFilter;
