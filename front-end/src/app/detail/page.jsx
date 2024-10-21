"use client";
import React, { useState } from "react";
import MainLayout from "@/layout/MainLayout";
import ProductDetail from "@/components/ProductsList/ProductDetail";
import { useBreadcrumb } from "@/contexts/BreadCrumbProvider";
const page = () => {
  const {
    selectedCategoryId,
    parentCategory,
    childCategory,
    handleHomeClick,
    handleParentCategoryClick,
    handleChildCategoryClick,
  } = useBreadcrumb();

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
