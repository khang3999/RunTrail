import React from "react";
import ProductGrid from "@/components/grid_product/grid_product";
import SideBarProduct from "@/components/side_bar_product/side_bar_product";
import styles from "./home_page.module.css";
import QuickFilter from "@/components/filters/QuickFilter";
import CategoryFilter from "@/components/filters/CategoryFilter";
import MyNavbar from "@/components/navbar/MyNavbar";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <MyNavbar />
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <SideBarProduct />
        </div>
        <div className={styles.productSection}>
          <QuickFilter />
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
