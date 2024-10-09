'use client';
import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useProductProvider } from '@/contexts/ProductProvider';

const PriceFilter = ({ brandId }) => {
	const [range, setRange] = useState([0, 20000000]);
	const [message, setMessage] = useState('');
	const { setProducts } = useProductProvider();

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
		console.log(data);
		if (data.length === 0) {
			setProducts([]);
			return;
		} else {
			setProducts(data);
		}
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
		<div className="w-full">
			<div className="px-1">
				<Slider
					range
					min={0}
					max={20000000}
					value={range}
					onChange={handleRangeChange}
				/>
			</div>
			<div className="flex items-center justify-between w-full">
				<span>{range[0].toLocaleString('vi-VN')}đ</span>
				<span>{range[1].toLocaleString('vi-VN')}đ</span>
			</div>
			<div className="flex items-center justify-center flex-col mt-4">
				<input
					className="w-full outline-none border border-gray-300 rounded-lg p-2"
					type="number"
					value={range[0]}
					onChange={(e) =>
						handleRangeChange([Number(e.target.value), range[1]])
					}
				/>
				<span> - </span>
				<input
					disabled
					className="w-full outline-none border border-gray-300 rounded-lg p-2"
					type="number"
					value={range[1]}
					onChange={(e) =>
						handleRangeChange([range[0], Number(e.target.value)])
					}
				/>
				{/* Message */}
				<div className="text-sm font-semibold mt-2">
					{message && <p className="text-red-500">{message}</p>}
				</div>
			</div>
			<button
				className="uppercase mt-4 py-2 rounded-lg border-gray-300 w-full border"
				onClick={() => handleFilterProducts()}
			>
				SEARCH
			</button>
		</div>
	);
};

export default PriceFilter;
