import React, { useState } from 'react';
import ProductGrid from '@/components/GridProduct';
import SideBarProduct from '@/components/SideBarProduct';
import styles from './HomePage.module.css';
import QuickFilter from '@/components/Filters/QuickFilter';
import MyNavbar from "@/components/navbar/MyNavbar";
import Breakcumb from '@/components/Breakcumb';

const HomePage = () => {
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);
	const [parentCategory, setParentCategory] = useState('');
	const [childCategory, setChildCategory] = useState('');

	const handleParentCategoryClick = (categoryId, categoryName) => {
		setSelectedCategoryId(categoryId);
		setParentCategory(categoryName);
		setChildCategory('');
	};

	const handleChildCategoryClick = (categoryId, categoryName) => {
		setSelectedCategoryId(categoryId);
		setChildCategory(categoryName);
	};

	const handleHomeClick = () => {
		// Cập nhật lại parent và child thành null
		setParent(null);
		setChild(null);
	};

	return (
		<div className={styles.homepage}>
			<MyNavbar onParentCategoryClick={handleParentCategoryClick} onChildCategoryClick={handleChildCategoryClick} />
			<Breakcumb
				parent={parentCategory}
				child={childCategory}
				onHomeClick={handleHomeClick}
				onParentCategoryClick={handleParentCategoryClick} onChildCategoryClick={handleChildCategoryClick}
			/>
			
			<div className={styles.mainContent}>
				<div className={styles.sidebar}>
					<SideBarProduct categoryId={selectedCategoryId} />
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
