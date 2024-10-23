'use client';
import React from 'react';
import RelatedProduct from '@/components/RelatedProduct';
import { useProductProvider } from '@/contexts/ProductProvider';

export default function DetailProduct() {
	const { products, isLoading } = useProductProvider();

	return (
		<>
			<RelatedProduct categories={8} isLoading={isLoading} />
		</>
	);
}
