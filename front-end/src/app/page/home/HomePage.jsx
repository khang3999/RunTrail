import React from 'react';
import ProductGrid from '@/components/GridProduct';
import SideBarProduct from '@/components/SideBarProduct';
import styles from './HomePage.module.css';
import QuickFilter from '@/components/Filters/QuickFilter';
import MyNavbar from "@/components/navbar/MyNavbar";
const HomePage = ({}) => {
	return (
	  <div className={styles.homepage}>
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
