"use client";
import { useProductProvider } from "@/contexts/ProductProvider";
import { useEffect, useState } from "react";

export default function QuickFilter() {
  const {
    totalElements,
    setContentOrderBy,
    products,
    setProducts,
    setFirstFilter,
    setCurrentPage,
    isFirstFilter,
    fetchProducts,
    currentPage,
    productsPerPage,
  } = useProductProvider();

  const handleQuickFilterProducts = async () => {
    // setFirstFilter(true)
    // (isFirstFilter&&setCurrentPage(1))
    // const response = await fetch(
    // 	'http://localhost:8008/api/v1/spu/filter1?page=${currentPage}&size=${productsPerPage}&contentOrderBy=${contentOrderBy}',
    // 	{
    // 		method: 'GET',
    // 		headers: {
    // 			'Content-Type': 'application/json',
    // 		},
    // 	}
    // );
    // const data = await response.json();
    // console.log(data);
    // if (data.length === 0) {
    // 	setProducts([]);
    // 	return;
    // } else {
    // 	setProducts(data.metadata.content);
    //     console.log(data.metadata.content);
    // }
    // setProducts(products)
  };

  // useEffect(() => {
  //     // handleQuickFilterProducts()
  // 	fetchProducts()
  // }, [contentOrderBy]);

  const handleContentChange = (value) => {
    setContentOrderBy(value);
    // handleQuickFilterProducts();
    setFirstFilter(true);
    console.log(value);
  };

  return (
    <div
      className="quiz mb-3"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>{totalElements} sản phẩm</p>
      <select
        style={{ border: "1px solid black", borderRadius: "4px" }}
        onChange={(e) => handleContentChange(e.target.value)}
        defaultValue={""}
      >
        <option value="" disabled hidden>
          Chọn sắp xếp
        </option>
        <option value="asc">Giá tăng dần</option>
        <option value="desc">Giá giảm dần</option>
        <option value="sale">Giảm giá nhiều nhất</option>
      </select>
    </div>
  );
}
