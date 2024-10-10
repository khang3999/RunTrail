import React from "react";
import ProductGrid from "@/components/GridProduct";
import SideBarProduct from "@/components/SidebarProduct";
import QuickFilter from "@/components/QuickFilter";
import styles from "./home_page.module.css";
import Test from "@/components/test";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.sidebar} style={{ flex: 3, marginRight: "10px" }}>
        <SideBarProduct />
      </div>
      <div style={{ flex: 9 }}>
          <QuickFilter/>
        <ProductGrid />
      </div>
    </div>
  );
};

export default HomePage;
