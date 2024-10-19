'use client';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './GridProduct.module.css';
import { useProductProvider } from '@/contexts/ProductProvider';
import Pagination from '../Pagination';
import ProductItemSkeleton from '../ProductsList/ProductItemSkeleton';
import ProductItem from '../ProductsList/ProductItem';

const ProductGrid = () => {
	const {
		products,
		isLoading,
		currentPage,
		setCurrentPage,
		productsPerPage,
		totalPages,
		currentProducts,
	} = useProductProvider();

	if (isLoading) {
		return (
			<div>
				<div className={styles.grid}>
					{Array(20)
						.fill(0)
						.map((_, index) => (
							<ProductItemSkeleton />
						))}
				</div>
			</div>
		);
	}

	if (products.length === 0 && !isLoading) {
		return (
			<h1 style={{ color: 'red', fontSize: '20px' }}>
				Không tìm thấy sản phẩm
			</h1>
		);
	}

	return (
		<div>
			<div className={styles.grid}>
				{products.map((product) => (
					<>
						<ProductItem product={product} />
					</>
				))}
			</div>

			<Pagination />
		</div>
	);
};

export default ProductGrid;
