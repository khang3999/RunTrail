"use client"
import React, { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import ProductDetail from '@/components/ProductsList/ProductDetail';

const page = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [parentCategory, setParentCategory] = useState('');
    const [childCategory, setChildCategory] = useState('');

    const handleParentCategoryClick = (categoryId, categoryName) => {
        setSelectedCategoryId(categoryId);
        setParentCategory(categoryName);
        setChildCategory(''); // Reset childCategory khi chọn parent
    };

    const handleChildCategoryClick = (categoryId, categoryName) => {
        setSelectedCategoryId(categoryId);
        setChildCategory(categoryName);
    };

    const handleHomeClick = () => {
        // Cập nhật lại parent và child thành null
        setParentCategory('');
        setChildCategory('');
        setSelectedCategoryId(null);
    };

    return (
        <MainLayout
            selectedCategoryId={selectedCategoryId}
            parentCategory={parentCategory}
            childCategory={childCategory}
            onHomeClick={handleHomeClick}
            onParentCategoryClick={handleParentCategoryClick}
            onChildCategoryClick={handleChildCategoryClick}
        >
            {(props) => (
                    <ProductDetail selectedCategoryId={props.selectedCategoryId} />
            )}
        </MainLayout>
    );
};

export default page;
