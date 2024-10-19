"use client";
import { useState, useEffect } from "react";
import { useProductProvider } from "@/contexts/ProductProvider";


const SkeletonLoader = () => {
  return (
    <div className="flex items-center justify-between w-full py-2 px-3 text-white bg-gray-400 animate-pulse rounded">
      <div className="w-20 h-5 bg-gray-300 rounded"></div>
      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
    </div>
  );
};

const CategoryComponent = ({ categories, isLoading,onCategoryClick }) => {

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
    onCategoryClick(categoryId);    
  };

  const renderMenuItems = (parentId) => {   
    return categories
      .filter((category) => category.parentId === parentId)
      .map((category) =>
        category.parentId === null ? (
          <li key={category.id} className="relative">
            <button
              id={`dropdownNavbarLink_${category.id}`}
              data-dropdown-toggle={`dropdownNavbar_${category.id}`}
              className="flex items-center bg-gray-900 justify-between w-full py-2 px-3 text-white rounded hover:text-green-500  dark:text-white"
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
            </button>
            {categories.some((cat) => cat.parentId === category.id) && (
              <div
                id={"dropdownNavbar_" + category.id}
                className={`absolute left-0 top-full z-10 ${
                  openDropdownId === category.id ? "block" : "hidden"
                } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={() => handleMouseLeave(category.id)}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby={`dropdownNavbarLink_${category.id}`}
                >
                  {renderMenuItems(category.id)}
                </ul>
              </div>
            )}
          </li>
        ) : (
          <li key={category.id}>
            <button
              className="block px-4 py-2 w-full text-start dark:hover:text-green-500"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          </li>
        )
      );
  };

  return <>{renderMenuItems(null)}</>;
};

export default function CategoryFilter({onCategoryClick}) {
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

  if (isLoading) {

    // Render skeletons matching the number of top-level categories
    return Array(7)
      .fill(null)
      .map((_, index) => <SkeletonLoader key={index}/>);
      
  }

  return <CategoryComponent categories={categories} isLoading={isLoading} onCategoryClick={onCategoryClick}/>;
}
