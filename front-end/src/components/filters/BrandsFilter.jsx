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
        if (selectedBrands.length === 0) {
            // Nếu không có thương hiệu nào được chọn, có thể bỏ qua hoặc lấy tất cả
            return;
        }

        const selected = selectedBrands.join(','); // Chuyển đổi mảng ID thành chuỗi
        const res = await fetch(
            `http://localhost:8008/api/skus/filter?brandId=${selected}`, // Gửi yêu cầu đến API
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await res.json(); // Nhận dữ liệu từ API
        setProducts(data); // Cập nhật danh sách sản phẩm
    };

    return (
        <div className="w-80 mx-auto text-black">
            <div className="border p-2 bg-white">
                <input
                    type="text"
                    placeholder="Tùy chọn tìm kiếm."
                    className="w-full p-2 mb-2 border"
                />
                <div className="max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                        <div key={brand.id} className="flex items-center mb-1">
                            <input
                                type="checkbox"
                                id={`brand-${brand.id}`} // ID checkbox
                                checked={selectedBrands.includes(brand.id)} // Kiểm tra xem thương hiệu có được chọn không
                                onChange={() => handleBrandChange(brand.id)} // Thay đổi trạng thái khi click
                                className="mr-2"
                            />
                            <label htmlFor={`brand-${brand.id}`} className="flex-grow text-sm">
                                {brand.brandName} // Tên thương hiệu
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="uppercase mt-4 py-2 rounded-lg border-gray-300 w-full border"
                onClick={() => filterProductsByBrand()} // Gọi hàm lọc khi click
            >
                FILTER
            </button>
        </div>
    );
};

export default BrandsFilter;
