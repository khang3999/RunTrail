'use client';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './grid_product.module.css';
import { useProductProvider } from '@/contexts/ProductProvider';
import Pagination from '../Pagination';

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
					<div key={product.id} className={styles['product-card']}>
						<div className={styles['product-image']}>
							<img
								src={'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTpKL3cD_cwQBIw_4B8mjwFSoAfmQwPXyllLhGI3Btf1l0dGmuGASZJuvf-tL-nS7u0MgTsSn_S3xp3QViY0HCWsN40FjJ63_k3BVfR-wJb-uEZiuu08ffK&usqp=CAE'}
								alt={product.spuName}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
								}}
							/>
						</div>
						<h2 className={styles['product-name']}>
							{product.spuName}
						</h2>
						<p className={styles['product-price']}>
							{product.spuPrice} VND
						</p>
					</div>
				))}
			</div>

			<Pagination />
		</div>
	);
};

export default ProductGrid;
