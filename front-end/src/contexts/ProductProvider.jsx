'use client';
import React from 'react';

const ProductContext = React.createContext();
function ProductProvider({ children }) {
	const [products, setProducts] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [productsPerPage] = React.useState(3);
	const [totalPages, setTotalPages] = React.useState(0);
	const [numberOfElements, setNumberOfElements] = React.useState(0);
	const [totalElements, setTotalElements] = React.useState(0);

	React.useEffect(() => {
		fetchProducts();
	}, [currentPage]);

	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(
				`http://localhost:8008/api/v1/spu/filter?page=${currentPage}&size=${productsPerPage}`
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
				totalElements
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export const useProductProvider = () => React.useContext(ProductContext);

export default ProductProvider;
