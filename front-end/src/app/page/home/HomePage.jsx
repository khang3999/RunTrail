import React from 'react';
import ProductGrid from '@/components/GridProduct';
import SideBarProduct from '@/components/SideBarProduct';
import styles from './HomePage.module.css';
import QuickFilter from '@/components/Filters/QuickFilter';
import MyNavbar from "@/components/navbar/MyNavbar";
import DetailProduct from '@/app/detail/page';
const HomePage = () => {
	return (
	//   <div className={styles.homepage}>
	// 	<MyNavbar />
	// 	<div className={styles.mainContent}>
	// 	  <div className={styles.sidebar}>
	// 		<SideBarProduct />
	// 	  </div>
	// 	  <div className={styles.productSection}>
	// 		<QuickFilter />
	// 		<ProductGrid />
	// 	  </div>
	// 	</div>
	//   </div>

	// Test detail
	<DetailProduct></DetailProduct>
	);
  };

export default HomePage;
