"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useProductProvider } from "@/contexts/ProductProvider";
import debounce from "lodash.debounce";

import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const buildCategoryTree = (categories) => {
  const map = {};
  const roots = [];

  categories.forEach((category) => {
    map[category.id] = { ...category, children: [] };
  });

  categories.forEach((category) => {
    if (category.parentId === null) {
      roots.push(map[category.id]);
    } else if (map[category.parentId]) {
      map[category.parentId].children.push(map[category.id]);
    }
  });

  return roots;
};

const CategoryFilterV2 = ({ categoryId }) => {
  const [categories, setCategories] = useState([]);
  const [openParentCategory, setOpenParentCategory] = useState({});
  const { setCategoryId } = useProductProvider();
  const [activeSubcategory, setActiveSubcategory] = useState({});
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8008/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  const toggleCategory = (categoryId, parentId = null) => {
    if (parentId === null) {
      //parent category is an already open, close it 
      if (openParentCategory[categoryId]) {
        setCategoryId(-1);
        setOpenParentCategory((prev) => {
          const newOpenCategories = { ...prev };
          delete newOpenCategories[categoryId];
          return newOpenCategories;
        });
        setOpenParentCategory((prevSelected) => {
          const updatedSelected = { ...prevSelected };
          delete updatedSelected[categoryId];
          return updatedSelected;
        });
        return;
      }

   
      setCategoryId(categoryId);

      // close all other parents and open the selected one
      setOpenParentCategory((prev) => {
        const newOpenCategories = { [categoryId]: true };
        return newOpenCategories;
      });

      // clear the active subcategory for other parents
      setActiveSubcategory((prevSelected) => {
        const updatedSelected = {};
        updatedSelected[categoryId] = prevSelected[categoryId];
        return updatedSelected;
      });
    } else {
      // If it's a subcategory
      setCategoryId(categoryId);
      setOpenParentCategory((prev) => ({
        ...prev,
        [parentId]: true, // the parent category remains open
      }));
      setActiveSubcategory((prevSelected) => ({
        ...prevSelected,
        [parentId]: categoryId, // update the active subcategory for this parent
      }));
    }
  };
  const categoryTree = buildCategoryTree(categories);

  const renderCategories = (categories, parentId = null) => {
    return categories.map((category) => {
      const isSelectedSubcategory =
        activeSubcategory[parentId] === category.id && parentId !== null;

      return (
        <div key={category.id} className="mb-2">
          <div
            className={`flex justify-between items-center cursor-pointer py-2 hover:text-purple-400 ${
              openParentCategory[category.id] ? 'text-purple-600' : ''
            } ${isSelectedSubcategory ? 'text-purple-600' : ''}`}
            onClick={() => toggleCategory(category.id, parentId)}
          >
            {category.name}
            {category.children.length > 0 ? (
              openParentCategory[category.id] ? (
                <FaChevronDown className="text-sm" />
              ) : (
                <FaChevronRight className="text-sm" />
              )
            ) : null}
          </div>
          {openParentCategory[category.id] && category.children.length > 0 && (
            <div className="ml-4 mt-1">
              {renderCategories(category.children, category.id)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto text-black">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="max-h-50 overflow-y-auto">
          {renderCategories(categoryTree)}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterV2;
