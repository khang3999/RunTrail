'use client';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './grid_product.module.css';
import { useProductProvider } from '@/contexts/ProductProvider';

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
			<div className={styles.grid}>
				{Array(productsPerPage)
					.fill()
					.map((_, index) => (
						<div key={index} className={styles['product-card']}>
							<Skeleton className={styles['product-image']} />
							<Skeleton className={styles['product-name']} />
							<Skeleton className={styles['product-name']} />
							<Skeleton className={styles['product-name']} />
						</div>
					))}
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
				{currentProducts.map((product) => (
					<div key={product.id} className={styles['product-card']}>
						<div className={styles['product-image']}>
							<img
								src={`http://localhost:8008/api/skus/${product.id}/image`}
								alt={product.skuName}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
								}}
							/>
						</div>
						<h2 className={styles['product-name']}>
							{product.skuName}
						</h2>
						<p className={styles['product-price']}>
							{product.skuPrice} VND
						</p>
					</div>
				))}
			</div>

			<div className={styles.pagination}>
				<button
					onClick={() =>
						setCurrentPage((prev) => Math.max(prev - 1, 1))
					}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<span>{`Page ${currentPage} of ${totalPages}`}</span>
				<button
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default ProductGrid;
