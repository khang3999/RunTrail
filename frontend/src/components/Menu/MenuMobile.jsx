import { useAppProvider } from '@/contexts/AppProvider';
import { useProductProvider } from '@/contexts/ProductProvider';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const MenuMobile = ({ drawerRef }) => {
    const { setIsHidden } = useAppProvider();
    const { setCategoryId, categoryId } = useProductProvider();
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Fetch categories data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8008/api/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        setCategoryId(category.id);
        router.push(`/products`);
        // Mở dropdown nếu là danh mục con
        if (categories.some((cat) => cat.parentId === category.id)) {
            setOpenDropdownId(category.id);
        }
    };

    const toggleDropdown = (categoryId) => {
        setOpenDropdownId((prevId) => (prevId === categoryId ? null : categoryId));
    };

    const renderMenuItems = (parentId) => {
        return categories
            .filter((category) => category.parentId === parentId)
            .map((category) => (
                <li key={category.id} className="border-b">
                    <div
                        className={`flex items-center justify-between px-4 py-3 ${
                            categoryId === category.id ? 'bg-blue-100 text-blue-600' : 'text-gray-800'
                        }`}
                    >
                        <button
                            className="flex-1 text-left font-medium"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category.name}
                        </button>
                        {categories.some((cat) => cat.parentId === category.id) && (
                            <button
                                className="ml-2 text-gray-600"
                                onClick={() => toggleDropdown(category.id)}
                            >
                                {openDropdownId === category.id ? "−" : "+"}
                            </button>
                        )}
                    </div>
                    {openDropdownId === category.id && (
                        <ul className="pl-4">
                            {renderMenuItems(category.id)}
                        </ul>
                    )}
                </li>
            ));
    };

    return (
        <div
            ref={drawerRef}
            className="fixed top-0 left-0 z-40 h-full p-4 overflow-y-auto transition-transform -translate-x-full bg-gray-100 lg:w-1/3 w-11/12"
            tabIndex="-1"
        >
            <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500">
                <svg
                    className="w-4 h-4 me-2.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                Menu
            </h5>
            <button
                onClick={() => {
                    setIsHidden(true);
                }}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center"
            >
                <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>

            {isLoading ? (
                <ul>
                    {Array(5)
                        .fill(null)
                        .map((_, index) => (
                            <li
                                key={index}
                                className="w-full h-5 bg-gray-200 rounded mb-3 animate-pulse"
                            ></li>
                        ))}
                </ul>
            ) : (
                <ul className="w-full bg-white shadow rounded-md">
                    {renderMenuItems(null)}
                </ul>
            )}
        </div>
    );
};

export default MenuMobile;
