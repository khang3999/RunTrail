"use client"
import React, { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
    const [parentCategory, setParentCategory] = useState('');
    const [childCategory, setChildCategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const handleParentCategoryClick = (categoryId, categoryName) => {
        setSelectedCategoryId(categoryId);
        setParentCategory(categoryName);
        setChildCategory('');
    };

    const handleChildCategoryClick = (categoryId, categoryName) => {
        setSelectedCategoryId(categoryId);
        setChildCategory(categoryName);
    };

    const handleHomeClick = () => {
        setParentCategory('');
        setChildCategory('');
        setSelectedCategoryId(null);
    };

    return (
        <BreadcrumbContext.Provider
            value={{
                parentCategory,
                childCategory,
                selectedCategoryId,
                handleParentCategoryClick,
                handleChildCategoryClick,
                handleHomeClick
            }}
        >
            {children}
        </BreadcrumbContext.Provider>
    );
};
