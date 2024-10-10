'use client';
import React, { useEffect, useState } from 'react';
import { useProductProvider } from '@/contexts/ProductProvider';

const BrandsFilter = () => {
    const [brands, setBrands] = useState([]); // Danh sách thương hiệu
    const [selectedBrands, setSelectedBrands] = useState([]); // Thương hiệu đã chọn
    const { setProducts } = useProductProvider(); // Hook để cập nhật danh sách sản phẩm

    // Fetch danh sách các thương hiệu từ API
    useEffect(() => {
        const fetchBrandsData = async () => {
            const res = await fetch('http://localhost:8008/api/brands', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            setBrands(data); // Cập nhật danh sách thương hiệu
        };
        fetchBrandsData();
    }, []);

    // Hàm xử lý khi người dùng chọn hoặc bỏ chọn một thương hiệu
    const handleBrandChange = (brandId) => {
        if (selectedBrands.includes(brandId)) {
            setSelectedBrands(selectedBrands.filter((id) => id !== brandId)); // Bỏ chọn
        } else {
            setSelectedBrands([...selectedBrands, brandId]); // Chọn thương hiệu
        }
    };

    // Hàm lọc sản phẩm theo các thương hiệu đã chọn
    const filterProductsByBrand = async () => {
        let res = ""
        if (selectedBrands.length === 0) {
            res = await fetch(
                `http://localhost:8008/api/skus`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        } else {
            const selected = selectedBrands.join(',');
            res = await fetch(
                `http://localhost:8008/api/skus/filter?brandId=${selected}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }



        const data = await res.json();
        setProducts(data);
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

