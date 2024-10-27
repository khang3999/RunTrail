"use-client";
import React, { useEffect, useState, useCallback } from "react";
import { useProductProvider } from "@/contexts/ProductProvider";
import debounce from "lodash.debounce";

export default function SizesFilter({ categoryId }) {
  const [sizes, setSizes] = useState([]);
  const [tempSelectedSizes, setTempSelectedSizes] = useState([]);
  const { setSelectedSizes, filterProductsBySize } = useProductProvider();

  useEffect(() => {
    const fetchSizesData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8008/api/sku-attribute-values/by-category?categoryId=${categoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await res.json();
        // Remove duplicate sizes
        const uniqueSizes = Array.from(
          new Set(data.map((size) => size.name)),
        ).map((name) => data.find((size) => size.name === name));
        setSizes(uniqueSizes);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };
    if (categoryId) {
      fetchSizesData();
    }
  }, [categoryId]);

  const debouncedUpdateSizes = useCallback(
    debounce((updatedSizes) => {
      setSelectedSizes(updatedSizes);
      filterProductsBySize(updatedSizes);
    }, 2000),
    [filterProductsBySize],
  );

  const handleSizeChange = (sizeName) => {
    const updatedSelectedSizes = tempSelectedSizes.includes(sizeName)
      ? tempSelectedSizes.filter((name) => name !== sizeName)
      : [...tempSelectedSizes, sizeName];

    setTempSelectedSizes(updatedSelectedSizes);
    debouncedUpdateSizes(updatedSelectedSizes);
    console.log(updatedSelectedSizes);
  };

  return (
    <div className="w-full max-w-lg mx-auto text-black">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="max-h-48 overflow-y-auto">
          {sizes.map((size) => (
            <div key={size.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`size-${size.id}`}
                checked={tempSelectedSizes.includes(size.name)}
                onChange={() => handleSizeChange(size.name)}
                className="mr-2"
              />
              <label htmlFor={`size-${size.id}`} className="flex-grow text-sm">
                {size.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
