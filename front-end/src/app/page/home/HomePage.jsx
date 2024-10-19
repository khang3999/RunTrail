import React,{useState} from 'react';
import ProductGrid from '@/components/GridProduct';
import SideBarProduct from '@/components/SideBarProduct';
import styles from './HomePage.module.css';
import QuickFilter from '@/components/Filters/QuickFilter';
import MyNavbar from "@/components/navbar/MyNavbar";
import Breakcumb from '@/components/Breakcumb';

const HomePage = () => {
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);

	const handleCategoryClick = (categoryId) => {
		setSelectedCategoryId(categoryId);			
	}

	return (
	  <div className={styles.homepage}>
		<MyNavbar onCategoryClick={handleCategoryClick}/>
		<Breakcumb/>
		<div className={styles.mainContent}>
		  <div className={styles.sidebar}>
			<SideBarProduct categoryId={selectedCategoryId}/>
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
