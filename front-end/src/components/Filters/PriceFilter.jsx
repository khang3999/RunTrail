'use client';
import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useProductProvider } from '@/contexts/ProductProvider';

const PriceFilter = () => {
	const [range, setRange] = useState([0, 20000000]);
	const [minRange, setMinRange] = useState(0);
	const [maxRange, setMaxRange] = useState(20000000);
	const {} = useProductProvider();

	const { setMinPrice, setMaxPrice, errorMessage, setErrorMessage } =
		useProductProvider();

	const handleFilterProducts = async () => {
		setMinPrice(range[0]);
		setMaxPrice(range[1]);
	};

	const handleRangeChange = (value) => {
		setErrorMessage('');
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
					handleStyle={[
						{ borderColor: '#3b82f6' },
						{ borderColor: '#3b82f6' },
					]}
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
					min={'0'}
					max={'20000000'}
					onChange={(e) => {
						if (
							Number(e.target.value) > maxRange ||
							Number(e.target.value) < minRange
						) {
							// setErrorMessage('Giá không hợp lệ');
						} else {
							handleRangeChange([
								Number(e.target.value),
								range[1],
							]);
						}
					}}
				/>
				<span className="text-gray-500"> - </span>
				<input
					className="w-full sm:w-1/2 outline-none border border-gray-300 rounded-lg p-2"
					type="number"
					value={range[1]}
					min={'0'}
					max={'20000000'}
					onChange={(e) => {
						if (
							Number(e.target.value) > maxRange ||
							Number(e.target.value) < minRange
						) {
							// setErrorMessage('Giá không hợp lệ');
						} else {
							handleRangeChange([
								range[0],
								Number(e.target.value),
							]);
						}
					}}
				/>
			</div>
			{/* Message */}
			<div className="text-sm font-semibold mt-2 text-red-500 text-center">
				{errorMessage && <p>{errorMessage}</p>}
			</div>
			<button
				className="uppercase mt-4 py-2 rounded-lg border-gray-300 w-full border text-black transition-all"
				onClick={() => {
					handleFilterProducts();
				}}
			>
				SEARCH
			</button>
		</div>
	);
};

export default PriceFilter;
