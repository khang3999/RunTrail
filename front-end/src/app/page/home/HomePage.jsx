import React from 'react';
import ProductGrid from '@/components/GridProduct';
import SideBarProduct from '@/components/SideBarProduct';
import styles from './HomePage.module.css';
import QuickFilter from '@/components/Filters/QuickFilter';

const HomePage = () => {
	return (
		<div className={styles.homepage}>
			<div
				className={styles.sidebar}
				style={{ flex: 3, marginRight: '10px', height: 1580 }}
			>
				<SideBarProduct />
			</div>
			<div style={{ flex: 9 }}>
				<QuickFilter />
				<ProductGrid />
			</div>
		</div>
	);
};

export default HomePage;
