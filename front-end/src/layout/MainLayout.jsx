// layout/MainLayout.js
import React, { useState } from 'react';
import MyNavbar from "@/components/navbar/MyNavbar";
import Breakcumb from '@/components/Breakcumb';

const MainLayout = ({ children, selectedCategoryId, parentCategory, childCategory, onHomeClick, onParentCategoryClick, onChildCategoryClick }) => {
    return (
        <>
            {/* MyNavbar và Breakcumb */}
            <MyNavbar
                onParentCategoryClick={onParentCategoryClick}
                onChildCategoryClick={onChildCategoryClick}
            />
            <Breakcumb
                parent={parentCategory}
                child={childCategory}
                onHomeClick={onHomeClick}
            />
            
            {/* Truyền selectedCategoryId và các props khác vào children */}
            {/* {children({ selectedCategoryId })} */}
            <main>{children}</main>
        </>
    );
};

export default MainLayout;
