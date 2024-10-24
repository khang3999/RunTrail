'use client';
import TabInformationSkeleton from '@/components/TabInformationSkeleton';
import React from 'react';
import RelatedProduct from '@/components/RelatedProduct';
import { useProductProvider } from '@/contexts/ProductProvider';
import logo_shop from '@/assets/images/logo_shop.png';
import ReactImageMagnify from 'react-image-magnify';
import '@/assets/css/style.css';
export default function DetailProduct() {
	const {
		products,
		isLoading,
		currentPage,
		setCurrentPage,
		productsPerPage,
		totalPages,
		currentProducts,
	} = useProductProvider();

	return (
		<div>
			DetailProduct
			<RelatedProduct categories={8} isLoading={isLoading} />
		</div>
	);
}
