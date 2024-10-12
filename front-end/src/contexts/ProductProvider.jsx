'use client';
import React,{useState, useContext, createContext, useEffect} from 'react';

const ProductContext = createContext();
function ProductProvider({ children }) {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage] = useState(20);
	const [totalPages, setTotalPages] = useState(0);
	const [numberOfElements, setNumberOfElements] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [isFirstFilter, setFirstFilter] = useState(true);
	const [contentOrderBy, setContentOrderBy] = useState('desc');
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(20000000);
	const [categoryIds, setCategoryIds] = useState([]);



	useEffect(() => {
		fetchProducts();
	}, [currentPage, contentOrderBy, selectedBrands, minPrice, maxPrice, categoryIds]);

	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			(isFirstFilter&&setCurrentPage(1))
			const response = await fetch(
				`http://localhost:8008/api/v1/spu/filter1?page=${currentPage}&size=${productsPerPage}&contentOrderBy=${contentOrderBy}&brandIds=${selectedBrands.join(',')}`
			);
			
			const data = await response.json();
			const {
				metadata: { content: products, totalPages, numberOfElements,totalElements },
			} = data;
			setProducts(products);
			setTotalPages(totalPages);
			setNumberOfElements(numberOfElements);
			setIsLoading(false);
			setTotalElements(totalElements);
		} catch (error) {
			console.error('Error fetching products:', error);
			console.log("test");
			
			setIsLoading(false);
		}
	};

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	return (
		<ProductContext.Provider

			value={{
				products,
				setProducts,
				isLoading,
				setIsLoading,
				currentPage,
				setCurrentPage,
				productsPerPage,
				totalPages,
				indexOfLastProduct,
				indexOfFirstProduct,
				currentProducts,
				numberOfElements,
				setTotalPages,
				setNumberOfElements,
				totalElements,
				setFirstFilter,
				isFirstFilter,
				contentOrderBy,
				setContentOrderBy,
				selectedBrands,
				setSelectedBrands,
				minPrice,
				setMinPrice,
				maxPrice,
				setMaxPrice,
				categoryIds, 
				setCategoryIds
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export const useProductProvider = () => useContext(ProductContext);

export default ProductProvider;
