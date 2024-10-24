'use client';
import React, { useEffect, useState } from 'react';
import ProductDetailItem from '@/components/ProductDetailItem';
import Overplay from '@/components/Overlay';
import ProductImageModal from '@/components/ProductImageModal';
import RelatedProduct from '@/components/RelatedProduct';
import TabInformation from '@/components/TabInformation';
import Breadcrumb from '@/components/Breadcrumb';

export default function DetailProduct() {
	const [showModal, setShowModal] = useState(false);
	const [attributes, setAttributes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [product, setProduct] = useState({
		spuName: '',
		images: [],
		categoryId: '',
		spuDescription: '',
		brand: {
			brandName: '',
		},
		spuAttributes: {},
	});

	useEffect(() => {
		fetchProductDetail();
	}, []);

	const fetchProductDetail = async () => {
		setIsLoading(true);
		const response = await fetch('http://localhost:8008/api/v1/spu?id=2');
		const data = await response.json();
		if (data.statusCode === 200) {
			console.log(data.metadata);
			const {
				spuName,
				brand,
				spuAttributes,
				images,
				categoryId,
				spuDescription,
			} = data.metadata;

			setProduct({
				spuName,
				brand,
				images,
				spuDescription,
				categoryId,
				spuAttributes: JSON.parse(spuAttributes),
			});
			setIsLoading(false);
		}
	};

	const handleAttributeChange = () => {
		console.log('change attribute');
	};

	return (
		<div>
			{/* Product Image Model */}
			{product.images && product.images.length > 0 && (
				<>
					{/* Overlay */}
					<Overplay
						onClose={() => {
							setShowModal(false);
						}}
						visible={showModal}
					/>
					{/* Modal */}
					<ProductImageModal
						data={product.images}
						visible={showModal}
						onClose={() => {
							setShowModal(!showModal);
						}}
					/>
				</>
			)}

			<div className="">
				<Breadcrumb categoryId={product.categoryId} />
			</div>
			<div className="px-[200px] mt-3 h-[300px] grid grid-cols-2 gap-4">
				{/* product images */}
				<div className="">
					<button
						onClick={() => {
							if (product.images && product.images.length > 0) {
								setShowModal(!showModal);
							} else {
								alert('No image available');
							}
						}}
					>
						<img
							className="w-full h-full object-cover"
							src={
								product.images && product.images.length > 0
									? product.images[0].imgUrl
									: 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
							}
							alt=""
						/>
					</button>
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
			<div className="mt-[300px]">
				<TabInformation
					product={product}
					isLoading={isLoading}
				></TabInformation>
				<RelatedProduct
					categories={product.categoryId}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
