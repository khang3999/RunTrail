'use client';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useProductProvider } from './ProductProvider';

const FilterProductContext = React.createContext();

function FilterProvider({ children }) {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(20000000);
	const [brandIds, setBrandIds] = useState([]);
	const [categoryIds, setCategoryIds] = useState([]);
	const [search, setSearch] = useState(false);

	const {
		currentPage,
		productsPerPage,
		setProducts,
		setTotalPages,
		setNumberOfElements,
		setIsLoading,
	} = useProductProvider();

	// useCallback to ensure the function reference doesn't change unnecessarily
	const fetchProducts = useCallback(async () => {
		try {
			if (search) {
				const brandIdsStr = brandIds.join(',');
				const categoryIdsStr = categoryIds.join(',');
				const stringParams = `minPrice=${minPrice}&maxPrice=${maxPrice}&brandIds=${brandIdsStr}&categoryIds=${categoryIdsStr}`;

				setIsLoading(true);
				const response = await fetch(
					`http://localhost:8008/api/v1/spu/filter?page=${currentPage}&size=${productsPerPage}&${stringParams}`
				);
				const data = await response.json();
				const {
					metadata: {
						content: products,
						totalPages,
						numberOfElements,
					},
				} = data;
				setProducts(products);
				setTotalPages(totalPages);
				setNumberOfElements(numberOfElements);
				setSearch(false);
			}
		} catch (error) {
			console.error('Error fetching products:', error);
		} finally {
			setIsLoading(false);
		}
	}, [search]);

	// Debounce effect to avoid unnecessary API calls when inputs change quickly
	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			fetchProducts();
		}, 300); // 300ms debounce time

		return () => clearTimeout(debounceTimeout); // Cleanup debounce
	}, [fetchProducts]);

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
				search,
				setSearch,
			}}
		>
			{children}
		</FilterProductContext.Provider>
	);
}

export const useFilterProvider = () => useContext(FilterProductContext);

export default FilterProvider;
