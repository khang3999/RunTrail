"use client";
import { useState, useEffect } from "react";
import { useProductProvider } from "@/contexts/ProductProvider";




const CategoryComponent = ({ categories }) => {
  const { setCategoryId } = useProductProvider();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
  };

  const renderMenuItems = (parentId) => {
    return categories
      .filter((category) => category.parentId === parentId)
      .map((category) =>
        category.parentId === null ? (
          <NavDropdown
            id={category.id}
            title={category.name}
            onClick={() => handleCategoryChange(category.id)}
            onMouseEnter={() => setShowDropdown(category.id)}
            onMouseLeave={() => setShowDropdown(false)}
            show={showDropdown === category.id}
           
          >
            {renderMenuItems(category.id)}
          </NavDropdown>
        ) : (
          <NavDropdown.Item
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`m-2`}
          >
            {category.name}
          </NavDropdown.Item>
        )
      );
  };

  return <>{renderMenuItems(null)}</>;
};

export default function CategoryFilter() {
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
    return <div>Loading...</div>;
  }

  return <CategoryComponent categories={categories} />;
}
