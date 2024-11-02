"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useProductProvider } from "@/contexts/ProductProvider";
import debounce from "lodash.debounce";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'; 

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

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [openParentCategory, setOpenParentCategory] = useState({});
  const { categoryId, setCategoryId } = useProductProvider();
  const [activeSubcategory, setActiveSubcategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [parentCategoryLength, setParentCategoryLength] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8008/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoryId || categoryId === -1) return;

    const findCategoryPath = (categories, targetId) => {
      for (const category of categories) {
        if (category.id === targetId) return [category.id];
        if (category.children.length > 0) {
          const path = findCategoryPath(category.children, targetId);
          if (path) return [category.id, ...path];
        }
      }
      return null;
    };

    const categoryPath = findCategoryPath(buildCategoryTree(categories), categoryId);

    if (categoryPath) {
      const [parent, subcategory] = categoryPath.length === 2 ? categoryPath : [categoryPath[0], null];

      setOpenParentCategory({ [parent]: true });
      setActiveSubcategory(subcategory ? { [parent]: subcategory } : {});
    }
  }, [categoryId, categories]);

  const toggleCategory = (categoryId, parentId = null) => {
    if (parentId === null) {
      if (openParentCategory[categoryId]) {
        setCategoryId(-1);
        setOpenParentCategory((prev) => {
          const newOpenCategories = { ...prev };
          delete newOpenCategories[categoryId];
          return newOpenCategories;
        });
        setActiveSubcategory((prevSelected) => {
          const updatedSelected = { ...prevSelected };
          delete updatedSelected[categoryId];
          return updatedSelected;
        });

        return;
      }

      setCategoryId(categoryId);
      setOpenParentCategory(() => {
        return { [categoryId]: true };
      });
      setActiveSubcategory((prevSelected) => {
        const updatedSelected = {};
        updatedSelected[categoryId] = prevSelected[categoryId];
        return updatedSelected;
      });
    } else {
      setCategoryId(categoryId);
      setOpenParentCategory((prev) => ({
        ...prev,
        [parentId]: true,
      }));
      setActiveSubcategory((prevSelected) => ({
        ...prevSelected,
        [parentId]: categoryId,
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
          {isLoading ? (            
            // Show skeletons while loading
            Array.from({ length: categoryTree.length || 7 }).map((_, index) => (
              <Skeleton key={index} height={30} className="mb-2 my-4" />
            ))
          ) : (
            renderCategories(categoryTree)
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
