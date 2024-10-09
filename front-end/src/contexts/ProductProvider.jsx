'use client';
import React from 'react';

const ProductContext = React.createContext();
function ProductProvider({ children }) {
	const [products, setProducts] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [productsPerPage] = React.useState(20);

	React.useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('http://localhost:8008/api/v1/spu/filter');
				const data = await response.json();
				const {metadata:{content:products}} = data;
				setProducts(products);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching products:', error);
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const totalPages = Math.ceil(products.length / productsPerPage);
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
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}

export const useProductProvider = () => React.useContext(ProductContext);

export default ProductProvider;
