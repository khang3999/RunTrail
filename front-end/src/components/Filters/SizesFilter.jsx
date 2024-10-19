"use-client";
import React, { useEffect, useState } from "react";

export default function SizesFilter({ categoryId }) {
  const [sizes, setSizes] = useState([]);  
  

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
          }
        );
        const data = await res.json();
        setSizes(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };
    if (categoryId) {
      fetchSizesData();
    }
  }, [categoryId]);

  return (
    <div className="w-full max-w-lg mx-auto text-black">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="max-h-48 overflow-y-auto">
          {sizes.map((size) => (
            <div key={size.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`size-${size.id}`}
                // checked={tempSelectedBrands.includes(size.id)}
                onChange={() => {}}
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
