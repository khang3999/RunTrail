"use client"
import React, {useEffect, useState} from 'react';

const BrandsFilter = () => {
    const [brands, setBrands] = useState([])
    // Danh sách các thương hiệu có sẵn để lọc
    useEffect(() => {
        const fetchBrandsData = async () => {
            try {
                const res = await fetch('http://localhost:8008/api/brands', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify({
                    //     quiz_id: '67029b912635f0e8ffc5eb2c',
                    //     user_id:  userData._id,
                    //     // Bổ sung ID_EXECIRCE sau
                    // }),
                });

                const data = await res.json();
                setBrands(data);
            } catch (error) {
                console.error('Lỗi khi lấy câu hỏi:', error);
            }
        };
        fetchBrandsData();
    }, []);

    // const brands = [
    //     { name: '2XU', count: 89 },
    //     { name: 'ADIDAS', count: 605 },
    //     { name: 'AIRWALK', count: 4 },
    //     { name: 'BAHE', count: 20 },
    //     { name: 'BALEGA', count: 38 },
    //     { name: 'BODY SCULPTURE', count: 39 },
    //     { name: 'BROOKS', count: 7 },
    // ];

    // State để lưu trạng thái mở hoặc đóng của danh sách
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);

    // Hàm xử lý khi người dùng click vào tiêu đề để mở/đóng danh sách
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Hàm xử lý khi người dùng chọn một thương hiệu
    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((item) => item !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    return (
        <div className="w-80 mx-auto text-black">
            {/* Hộp tiêu đề để mở/đóng danh sách */}
            <div
                className="flex justify-between items-center p-2 bg-gray-100 cursor-pointer"
                onClick={toggleDropdown}
            >
                <span className="font-bold text-black">THƯƠNG HIỆU</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>

            {/* Hiển thị danh sách thương hiệu khi mở */}
            {isOpen && (
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
                                    id={brand.brandName}
                                    checked={selectedBrands.includes(brand.brandName)}
                                    onChange={() => handleBrandChange(brand.brandName)}
                                    className="mr-2"
                                />


                                <label htmlFor={brand.brandName} className="flex-grow text-sm">
                                    {brand.brandName}
                                </label>
                                {/*<span className="text-xs">({brand.count})</span>*/}
                            </div>

                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrandsFilter;
