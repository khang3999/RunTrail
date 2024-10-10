"use client"
import React from 'react';

const FilterProductContext = React.createContext();

function FilterProvider({ children }) {
	const [minPrice, setMinPrice] = React.useState(0);
	const [maxPrice, setMaxPrice] = React.useState(20000000);
	const [brandIds, setBrandIds] = React.useState([]); // 1,2,3,3...
	const [categoryIds, setCategoryIds] = React.useState([]); // 1,2,3,3...

	return (
		<FilterProductContext.Provider
			value={{
				minPrice,
				setMinPrice,
				maxPrice,
				setMaxPrice,
				brandIds,
				setBrandIds,
				categoryIds,
				setCategoryIds,
			}}
		>
			{children}
		</FilterProductContext.Provider>
	);
}

export const useFilterProvider = () => React.useContext(FilterProductContext);

export default FilterProvider;
