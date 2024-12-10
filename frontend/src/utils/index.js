'use strict';

export const convertLocationData = (data) => {
	return data.map((province) => ({
		key: province.code,
		value: province.name,
	}));
};

export const formatCurrency = (input) => {
	const number = parseInt(input, 10);
	if (isNaN(number)) {
		return 'Invalid input';
	}
	return number.toLocaleString('vi-VN') + 'đ';
};

export const minPrice = (skuList) => {
	const price = [
		...skuList.map((sku) => {
			if (sku.skuPrice === null) {
				return null;
			}

			return sku.skuPrice;
		}),
	];

	// console.log(price);

	const filteredPrice = price.filter((item) => item);
	const min = Math.min(...filteredPrice);
	return min;
};
