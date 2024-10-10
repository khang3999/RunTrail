'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useProductProvider } from '@/contexts/ProductProvider';
import debounce from 'lodash.debounce';

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
            setBrands(data); 
        };
        fetchBrandsData();
    }, []);

    const filterProductsByBrand = async (selectedBrands) => {
        const params = new URLSearchParams();

        if (selectedBrands.length > 0) {
            const selected = selectedBrands.join(',');
            params.append('brandIds', selected);
        }

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
        setProducts(data.metadata.content);
    };

    // Sử dụng debounce để giảm tải gọi API
    const debouncedFilterProducts = useCallback(debounce(filterProductsByBrand, 500), []);

    const handleBrandChange = (brandId) => {
        const updatedSelectedBrands = selectedBrands.includes(brandId)
            ? selectedBrands.filter((id) => id !== brandId)
            : [...selectedBrands, brandId];

        setSelectedBrands(updatedSelectedBrands);

        // Gọi hàm lọc sản phẩm với debounce
        debouncedFilterProducts(updatedSelectedBrands);
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
        </div>
    );
};

export default BrandsFilter;
