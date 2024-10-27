'use client';
import React, { useEffect, useState } from 'react';
import ProductDetailItem from '@/components/ProductDetailItem';
import RelatedProduct from '@/components/RelatedProduct';
import TabInformation from '@/components/TabInformation';
import Breadcrumb from '@/components/Breadcrumb';
import ImageDesktop from '@/components/detail/ImageDesktop';
import PageTitle from '@/components/PageTitle';
import { useParams } from 'next/navigation';
import { metadatasite } from '@/app/layout';
export default function DetailProduct() {
	const { slug } = useParams();
	const [showModal, setShowModal] = useState(false);
	const [product, setProduct] = useState({
		id: '',
		spuName: '',
		brand: {
			brandName: '',
		},
		images: [],
		categoryId: '',
		spuDescription: '',
		spuAttributes: {},
		spuPrice: 0,
		discount: 0,
		spuNo: '',
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchProductDetail();
	}, []);
	const fetchProductDetail = async () => {
		setIsLoading(true);
		const response = await fetch(
			`http://localhost:8008/api/v1/spu?slug=${slug}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		if (data.statusCode === 200) {
			const {
				spuName,
				brand,
				spuAttributes,
				discount,
				images,
				categoryId,
				spuDescription,
				id,
				skuList,
				spuNo,
			} = data.metadata;
			setProduct({
				spuName,
				brand,
				spuAttributes: JSON.parse(spuAttributes),
				spuPrice: 100001,
				images,
				spuDescription,
				categoryId,
				discount,
				id,
				spuPrice: getSpuPrice(skuList),
				spuNo,
			});
			metadatasite.title = spuName;
			setIsLoading(false);
		}
	};

	// get spu_price
	const getSpuPrice = (skuList) => {
		let minPrice = 0;
		skuList.forEach((sku) => {
			if (minPrice === 0) {
				minPrice = sku.skuPrice;
			}
			if (sku.skuPrice < minPrice) {
				minPrice = sku.skuPrice;
			}
		});
		return minPrice;
	};

	return (
		<PageTitle title={'Product Detail'}>
			<div>
				<div className="">
					<Breadcrumb categoryId={product.categoryId} />
				</div>
				<div className="lg:px-[200px] px-4 mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
					{/* product images */}
					<div className="">
						<ImageDesktop
							product={product}
							isLoading={isLoading}
						></ImageDesktop>
					</div>
					<div>
						<ProductDetailItem
							handleProductImageClick={() => {
								setShowModal(!showModal);
							}}
							product={product}
							isLoading={isLoading}
						/>
					</div>
				</div>
				<div className="mt-[20px]">
					<TabInformation
						product={product}
						isLoading={isLoading}
					></TabInformation>
					<RelatedProduct
						categories={product.categoryId}
						product={product}
						setProduct={setProduct}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</PageTitle>
	);
}
