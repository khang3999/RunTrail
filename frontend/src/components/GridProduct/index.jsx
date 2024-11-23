import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./GridProduct.module.css";
import { useProductProvider } from "@/contexts/ProductProvider";
import Pagination from "../Pagination";
import ProductItemSkeleton from "../ProducItemSkeleton";
import ProductItem from "../ProductItem";

const ProductGrid = () => {
  const {
    products,
    isLoading,
    currentPage,
    setCurrentPage,
    productsPerPage,
    totalPages,
    currentProducts,
  } = useProductProvider();

  if (isLoading) {
    return (
      <div>
        <div className={styles.grid}>
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <ProductItemSkeleton key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (products.length === 0 && !isLoading) {
    return (
      <h1 style={{ color: "red", fontSize: "20px" }}>
        Không tìm thấy sản phẩm
      </h1>
    );
  }

  return (
    <div>
      <div className={styles.grid}>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <ProductItem product={product} />
            </div>
          );
        })}
      </div>
      <Pagination />
    </div>
  );
};

export default ProductGrid;
