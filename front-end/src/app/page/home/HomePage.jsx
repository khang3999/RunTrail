import React from "react";
import ProductGrid from "@/components/GridProduct";
import SideBarProduct from "@/components/SideBarProduct";
import styles from "./HomePage.module.css";
import QuickFilter from "@/components/Filters/QuickFilter";
import { useProductProvider } from "@/contexts/ProductProvider";
import Breadcrumb from "@/components/Breadcrumb";
import PageTitle from "@/components/PageTitle";
import GoToTopButton from "@/components/GoToTopButton";
const HomePage = ({}) => {
  const { categoryId } = useProductProvider();
  return (
    <PageTitle title={"Home Page"}>
      <div className={styles.homepage}>
        <Breadcrumb categoryId={categoryId} />
        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <SideBarProduct categoryId={categoryId} />
          </div>
          <div className={styles.productSection}>
            <QuickFilter />
            <ProductGrid />
          </div>
        </div>
        <GoToTopButton/>
      </div>
    </PageTitle>
  );
};

export default HomePage;
