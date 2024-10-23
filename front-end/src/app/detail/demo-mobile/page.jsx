'use client';

import Overplay from '@/components/Overlay';
import ProductImageModal from '@/components/ProductImageModal';
import React, { useState } from 'react';

function DemoViewProductImageInMobile({ images }) {
	const [showModal, setShowModal] = useState(false);
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
				data={images}
				visible={showModal}
				onClose={() => {
					setShowModal(!showModal);
				}}
			/>
		</div>
	);
}

export default DemoViewProductImageInMobile;
