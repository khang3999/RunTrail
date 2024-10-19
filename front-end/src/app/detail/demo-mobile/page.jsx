'use client';

import Overplay from '@/components/Overlay';
import ProductImageModal from '@/components/ProductImageModal';
import React, { useState } from 'react';

function DemoViewProductImageInMobile() {
	const [showModal, setShowModal] = useState(false);
	const IMAGES = [
		'https://supersports.com.vn/cdn/shop/files/3ME30022561-1.jpg?v=1725532026',
		'https://supersports.com.vn/cdn/shop/files/3ME30022561-2.jpg?v=1725532026',
		'https://supersports.com.vn/cdn/shop/files/3ME30022561-3.jpg?v=1725532026',
		'https://supersports.com.vn/cdn/shop/files/3ME30022561-4.jpg?v=1725532026',
		'https://supersports.com.vn/cdn/shop/files/3ME30022561-5.jpg?v=1725532026',
		'https://supersports.com.vn/cdn/shop/files/3ME30022561-6.jpg?v=1725532026',
	];
	return (
		<div className="flex overflow-y-scroll items-center justify-center w-full h-[100vh] flex-col">
			<button
				onClick={() => {
					setShowModal(!showModal);
				}}
			>
				Toggle
			</button>
			<Overplay
				onClose={() => {
					setShowModal(false);
				}}
				visible={showModal}
			/>
			<ProductImageModal
				data={IMAGES}
				visible={showModal}
				onClose={() => {
					setShowModal(!showModal);
				}}
			/>
		</div>
	);
}

export default DemoViewProductImageInMobile;
