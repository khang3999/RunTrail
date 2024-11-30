"use client";
import React, { useState, useContext, createContext } from "react";

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
   const [errorMessage, setErrorMessage] = useState("");

   const [minPrice, setMinPrice] = useState(0);
   const [maxPrice, setMaxPrice] = useState(20000000);
   const [categoryId, setCategoryId] = useState( 1);
   const [selectedBrands, setSelectedBrands] = useState([]);
   const [selectedSizes, setSelectedSizes] = useState(
      []);
   const [contentOrderBy, setContentOrderBy] = useState("desc",
   );

   const fetchProducts = async () => {
      try {
         setIsLoading(true);
         if (minPrice > maxPrice) {
            setErrorMessage("Giá tối thiểu phải nhỏ hơn giá tối đa");
            setIsLoading(false);
            return;
         }

         if (selectedBrands && selectedBrands.length > 0 && selectedBrands[0] === "") {
            selectedBrands.shift(); // Xóa phần tử rỗng
         }

         if (selectedSizes && selectedSizes.length > 0 && selectedSizes[0] === "") {
            selectedSizes.shift(); // Xóa phần tử rỗng
         }

         const brandIdsStr = (selectedBrands && selectedBrands.length > 0) ? selectedBrands.join(",") : '';
         const sizesNameStr = (selectedSizes && selectedSizes.length > 0) ? selectedSizes.join(",") : '';

         const stringParams = `minPrice=${minPrice}&maxPrice=${maxPrice}&brandIds=${brandIdsStr}&categoryId=${categoryId}&contentOrderBy=${contentOrderBy}&key=Size&value=${sizesNameStr}`;

         setIsLoading(true);

         isFirstFilter && setCurrentPage(1);
         const response = await fetch(
            `http://localhost:8008/api/v1/spu/filter1?page=${currentPage}&size=${productsPerPage}&${stringParams}`,
         );
         const data = await response.json();
         const {
            metadata: {
               content: products,
               totalPages,
               numberOfElements,
               totalElements,
            },
         } = data;
         setProducts(products);
         setTotalPages(totalPages);
         setNumberOfElements(numberOfElements);
         setIsLoading(false);
         setTotalElements(totalElements);
      } catch (error) {
         console.error("Error fetching products:", error);
         setIsLoading(false);
      }
   };

   const filterProductsByBrand = (selectedBrands) => {
      setFirstFilter(true);
      fetchProducts();
   };

   const filterProductsBySize = (selectedSizes) => {
      setFirstFilter(true);
      fetchProducts();
   };

   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct,
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
            errorMessage,
            setErrorMessage,
            categoryId,
            setCategoryId,
            filterProductsByBrand,
            filterProductsBySize,
            setSelectedSizes,
            selectedSizes,
            fetchProducts,
            activeSubcategory,
            setActiveSubcategory,
            openParentCategory,
            setOpenParentCategory,
         }}
      >
         {children}
      </ProductContext.Provider>
   );
}

export const useProductProvider = () => useContext(ProductContext);

export default ProductProvider;