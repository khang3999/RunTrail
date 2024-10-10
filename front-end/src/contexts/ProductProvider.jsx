'use client';
import React from 'react';

const ProductContext = React.createContext();
function ProductProvider({ children }) {
	const [products, setProducts] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [productsPerPage] = React.useState(4);
	const [totalPages, setTotalPages] = React.useState(0);
	const [numberOfElements, setNumberOfElements] = React.useState(0);

	React.useEffect(() => {
		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(`http://localhost:8008/api/v1/spu/filter?page=${currentPage}&size=${productsPerPage}`);
				const data = await response.json();
				const {metadata:{content:products,totalPages,numberOfElements}} = data;
				setProducts(products);
				setTotalPages(totalPages);
				setNumberOfElements(numberOfElements);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching products:', error);
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, [currentPage]);

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
				numberOfElements
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export const useProductProvider = () => React.useContext(ProductContext);

export default ProductProvider;
