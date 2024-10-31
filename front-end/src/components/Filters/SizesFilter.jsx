"use-client";
import React, { useEffect, useState, useCallback } from "react";
import { useProductProvider } from "@/contexts/ProductProvider";
import debounce from "lodash.debounce";

export default function SizesFilter({ categoryId }) {
  const [sizes, setSizes] = useState([]);
  const [tempSelectedSizes, setTempSelectedSizes] = useState([]);
  const { setSelectedSizes, filterProductsBySize,selectedBrands } = useProductProvider();
  
  
  useEffect(() => {
    

    const fetchSizesData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8008/api/v1/spu/sizes-by-categoryId-brandIds?categoryId=${categoryId}&brandIds=${selectedBrands}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await res.json();
        if (data.statusCode === 200 && data.metadata) {
          // Parse sizes and update state
          const parsedSizes = data.metadata.map((size) => JSON.parse(size)[0]);
          setSizes(parsedSizes);
          console.log("Sizes:", parsedSizes);
        } else {
          console.error("Failed to fetch sizes:", data.message);
        }  
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };
    if (categoryId) {
      fetchSizesData();
    }
  }, [categoryId,selectedBrands]);

  const debouncedUpdateSizes = useCallback(
    debounce((updatedSizes) => {
      setSelectedSizes(updatedSizes);
      filterProductsBySize(updatedSizes);
    }, 2000),
    [filterProductsBySize],
  );

  const handleSizesChange = (sizeName) => {
    const updatedSelectedSizes = tempSelectedSizes.includes(sizeName)
      ? tempSelectedSizes.filter((name) => name !== sizeName)
      : [...tempSelectedSizes, sizeName];

    setTempSelectedSizes(updatedSelectedSizes);
    debouncedUpdateSizes(updatedSelectedSizes);
    
  };

  return (
    <div className="w-full max-w-lg mx-auto text-black">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="max-h-48 overflow-y-auto">
          {sizes.map((size,index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`size-${size.id}`}
                checked={tempSelectedSizes.includes(size)}
                onChange={() => handleSizesChange(size)}
                className="mr-2"
              />
              <label htmlFor={`size-${index}`} className="flex-grow text-sm">
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
