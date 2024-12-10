import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from "react";
import { useProductProvider } from "@/contexts/ProductProvider";


const CategoryMenuItems = ({ categories, isLoading }) => {
    const { setCategoryId } = useProductProvider();
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const toggleDropdown = (categoryId, isOpen) => {
        setOpenDropdownId(isOpen ? categoryId : null);
    };

    const handleMouseEnter = (categoryId) => {
        toggleDropdown(categoryId, true);
    };

    const handleMouseLeave = (categoryId) => {
        toggleDropdown(categoryId, false);
    };

    const handleCategoryClick = (categoryId) => {        
        setCategoryId(categoryId);
        
    };

    const renderMenuItems = (parentId) => {
        return categories
            .filter((category) => category.parentId === parentId)
            .map((category) =>
                category.parentId === null ? (
                    <li key={category.id} className="relative">
                        <Link
                            href={"/product"}
                            id={`dropdownNavbarLink_${category.id}`}
                            data-dropdown-toggle={`dropdownNavbar_${category.id}`}
                            className="flex items-center  justify-between w-full py-2 px-3 rounded hover:text-green-500  dark:text-black"
                            onMouseEnter={() => handleMouseEnter(category.id)}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.name}
                            {categories.some((cat) => cat.parentId === category.id) && (
                                <svg
                                    className="w-2.5 h-2.5 ml-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            )}
                        </Link>
                        {categories.some((cat) => cat.parentId === category.id) && (
                            <div
                                id={"dropdownNavbar_" + category.id}
                                className={`absolute left-0 top-full z-10 ${openDropdownId === category.id ? "block" : "hidden"
                                    } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white dark:divide-gray-600`}
                                onMouseEnter={() => handleMouseEnter(category.id)}
                                onMouseLeave={() => handleMouseLeave(category.id)}
                            >
                                <ul
                                    className="py-2 text-sm text-white-700 dark:text-white-400"
                                    aria-labelledby={`dropdownNavbarLink_${category.id}`}
                                >
                                    {renderMenuItems(category.id)}
                                </ul>
                            </div>
                        )}
                    </li>
                ) : (
                    <li key={category.id}>
                        <Link
                            href={"/product"}
                            className="block px-4 py-2 w-full text-start hover:text-green-500"
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.name}
                        </Link>
                    </li>
                ),
            );
    };

    return <>{renderMenuItems(null)}</>;
}

export default function Menu() {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

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

    return (
        <div className='lg:flex hidden w-full'>
            <div className='pt-5'>
                <nav className="mb-4 ">
                    <ul className="flex justify-start space-x-4">
                        <CategoryMenuItems categories={categories} />
                    </ul>
                </nav>
            </div>
        </div>
    )
}