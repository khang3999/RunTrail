import React, { useState } from "react";
import ProductGrid from "@/components/GridProduct";
import SideBarProduct from "@/components/SideBarProduct";
import styles from "./HomePage.module.css";
import QuickFilter from "@/components/Filters/QuickFilter";
import MyNavbar from "@/components/navbar/MyNavbar";
import Breakcumb from "@/components/Breakcumb";
import MainLayout from "@/layout/MainLayout";
import {
  useBreadcrumb,
  BreadcrumbProvider,
} from "@/contexts/BreadCrumbProvider";

const HomePage = () => {
  const {
	selectedCategoryId,
    parentCategory,
    childCategory,
    handleHomeClick,
    handleParentCategoryClick,
    handleChildCategoryClick,
  } = useBreadcrumb();

  return (
    <BreadcrumbProvider>
      <div className={styles.homepage}>
        <MainLayout
          selectedCategoryId={selectedCategoryId}
          parentCategory={parentCategory}
          childCategory={childCategory}
          onHomeClick={handleHomeClick}
          onParentCategoryClick={handleParentCategoryClick}
          onChildCategoryClick={handleChildCategoryClick}
        >
          <div className={styles.mainContent}>
            <div className={styles.sidebar}>
              <SideBarProduct categoryId={selectedCategoryId} />
            </div>
            <div className={styles.productSection}>
              <QuickFilter />
              <ProductGrid />
            </div>
          </div>
        </MainLayout>
      </div>
    </BreadcrumbProvider>
  );
};

export default HomePage;
