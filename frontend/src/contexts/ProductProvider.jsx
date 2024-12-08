"use client";
import React, { useState, useContext, createContext, useEffect, useCallback } from "react";

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

   // Slug: minPrice-maxPrice-categoryId-brandIds-contentOrderBy
   const [minPrice, setMinPrice] = useState(0);
   const [maxPrice, setMaxPrice] = useState(20000000);
   const [categoryId, setCategoryId] = useState(-1);
   const [selectedBrands, setSelectedBrands] = useState([]);
   const [selectedSizes, setSelectedSizes] = useState([]);
   const [contentOrderBy, setContentOrderBy] = useState("desc");
   const [checkParams, setCheckParams] = useState(false);
   const [tempSelectedBrands, setTempSelectedBrands] = useState([]);

   useEffect(() => {
      if (typeof window !== "undefined") {
         const searchParams = new URLSearchParams(window.location.search);
         const params = Object.fromEntries(searchParams.entries());
         // setParams(Object.fromEntries(searchParams.entries()))

         setMinPrice(Number(params.minPrice) || 0);
         setMaxPrice(Number(params.maxPrice) || 20000000);
         setCategoryId(Number(params.categoryId) || -1);
         setSelectedBrands(params.brandIds?.split(",")?.filter(Boolean) || []);
         setTempSelectedBrands(params.brandIds?.split(",")?.filter(Boolean) || []);
         setTempSelectedBrands(
            params.brandIds && params.brandIds.split(",").length > 0
               ? params.brandIds.split(",")
               : []
         );
         setSelectedSizes(params.value?.split(",")?.filter(Boolean) || []);
         setContentOrderBy(params.contentOrderBy || "desc");
         setCheckParams(true);
      }
   }, []);

   const buildQueryParams = () => {
      const brandIdsStr = selectedBrands?.join(",") || '';
      const sizesNameStr = selectedSizes?.join(",") || '';
      return `minPrice=${minPrice}&maxPrice=${maxPrice}&brandIds=${brandIdsStr}&categoryId=${categoryId}&contentOrderBy=${contentOrderBy}&key=Size&value=${sizesNameStr}`;
   };

   const fetchProducts = useCallback(async () => {
      try {
         setIsLoading(true);

         if (minPrice > maxPrice) {
            setErrorMessage("Giá tối thiểu phải nhỏ hơn giá tối đa");
            setIsLoading(false);
            return;
         }

         const stringParams = buildQueryParams();
         window.history.replaceState({}, "", `?${stringParams}`);
         isFirstFilter && setCurrentPage(1);

         const response = await fetch(
            `http://localhost:8008/api/v1/spu/filter1?page=${currentPage}&size=${productsPerPage}&${stringParams}`,
         );
         const data = await response.json();

         const {
            metadata: { content: products, totalPages, numberOfElements, totalElements },
         } = data;

         setProducts(products);
         setTotalPages(totalPages);
         setNumberOfElements(numberOfElements);
         setTotalElements(totalElements);
         setIsLoading(false);
         setFirstFilter(false);
      } catch (error) {
         console.error("Error fetching products:", error);
         setIsLoading(false);
      }
   }, [minPrice, maxPrice, selectedBrands, selectedSizes, categoryId, contentOrderBy, currentPage, productsPerPage, isFirstFilter]);

   const filterProductsByBrand = (selectedBrands) => {
      setFirstFilter(true);
      // fetchProducts();
   };

   const filterProductsBySize = (selectedSizes) => {
      setFirstFilter(true);
      // fetchProducts();
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
            checkParams,
            setCheckParams,
            tempSelectedBrands,
            setTempSelectedBrands,
            // params
         }}
      >
         {children}
      </ProductContext.Provider>
   );
}

export const useProductProvider = () => useContext(ProductContext);

export default ProductProvider;
