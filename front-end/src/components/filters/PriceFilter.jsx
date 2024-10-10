'use client';
import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useProductProvider } from '@/contexts/ProductProvider';

const PriceFilter = ({ brandId }) => {
	const [range, setRange] = useState([0, 20000000]);
	const [message, setMessage] = useState('');
	const { setProducts, setTotalPages, setNumberOfElements } =
		useProductProvider();


	const handleFilterProducts = async () => {
		console.log(`Search for prices between ${range[0]} and ${range[1]} with brandId: ${brandId}`);
		let url = `http://localhost:8008/api/skus/filter?minPrice=${range[0]}&maxPrice=${range[1]}`;

		if (brandId) {
			url += `&brandId=${brandId}`;
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});


		const data = await response.json();
		setProducts([]);
		const {
			metadata: { content: products, totalPages, numberOfElements },
		} = data;
		setProducts(products);
		setTotalPages(totalPages);
		setNumberOfElements(numberOfElements);
	};

	const handleRangeChange = (value) => {
		if (value[0] > value[1]) {
			setMessage('Giá trị không hợp lệ');
			return;
		}
		setMessage('');
		setRange(value);
	};

	return (
		<div className="w-full max-w-lg mx-auto p-4">
			<div className="px-2 mb-4">
				<Slider
					range
					min={0}
					max={20000000}
					value={range}
					onChange={handleRangeChange}
					trackStyle={[{ backgroundColor: '#3b82f6' }]}
					handleStyle={[{ borderColor: '#3b82f6' }, { borderColor: '#3b82f6' }]}
				/>
			</div>
			<div className="flex items-center justify-between w-full mb-4 text-gray-700">
				<span>{range[0].toLocaleString('vi-VN')}đ</span>
				<span>{range[1].toLocaleString('vi-VN')}đ</span>
			</div>
			<div className="flex flex-col sm:flex-row items-center justify-center gap-2">
				<input
					className="w-full sm:w-1/2 outline-none border border-gray-300 rounded-lg p-2"
					type="number"
					value={range[0]}
					onChange={(e) =>
						handleRangeChange([Number(e.target.value), range[1]])
					}
				/>
				<span className="text-gray-500"> - </span>
				<input
					className="w-full sm:w-1/2 outline-none border border-gray-300 rounded-lg p-2"
					type="number"
					value={range[1]}
					onChange={(e) =>
						handleRangeChange([range[0], Number(e.target.value)])
					}
				/>
			</div>
			{/* Message */}
			<div className="text-sm font-semibold mt-2 text-red-500 text-center">
				{message && <p>{message}</p>}
			</div>
			<button
				className="uppercase mt-4 py-2 rounded-lg border-gray-300 w-full border text-black transition-all"
				onClick={() => handleFilterProducts()}
			>
				SEARCH
			</button>
		</div>
	);
};

export default PriceFilter;

