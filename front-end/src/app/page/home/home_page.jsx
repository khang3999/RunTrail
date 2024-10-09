import React from "react";

import ProductGrid from "@/components/grid_product/grid_product";
import SideBarProduct from "@/components/side_bar_product/side_bar_product";
import styles from "./home_page.module.css";
import { CategoryProvider, useCategory } from "@/contexts/CategoryContext";
const HomePage = () => {
  return (
    <CategoryProvider>
      <div className={styles.homepage}>
        <div
          className={styles.sidebar}
          style={{ flex: 3, marginRight: "10px", height: 1580 }}
        >
          <SideBarProduct />
        </div>
        <div style={{ flex: 9 }}>
          <ProductGrid />
        </div>
      </div>
    </CategoryProvider>
  );
};

export default HomePage;
