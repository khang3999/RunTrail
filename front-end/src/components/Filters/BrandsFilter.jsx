"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useProductProvider } from "@/contexts/ProductProvider";
import debounce from "lodash.debounce";

const BrandsFilter = ({ categoryId }) => {
  const [brands, setBrands] = useState([]);
  const [tempSelectedBrands, setTempSelectedBrands] = useState([]);
  const { setSelectedBrands, filterProductsByBrand } = useProductProvider();
	
  useEffect(() => {
    console.log("categoryId", categoryId);

    const fetchBrandsData = async () => {
      try {
        const res = await fetch(`http://localhost:8008/api/brands/by-category?categoryId=${categoryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    if (categoryId) {
      fetchBrandsData();
    }
  }, [categoryId]);

  const debouncedUpdateBrands = useCallback(
    debounce((updatedBrands) => {
      setSelectedBrands(updatedBrands);
      filterProductsByBrand(updatedBrands);
    }, 2000),
    [filterProductsByBrand]
  );

  const handleBrandChange = (brandId) => {
    const updatedSelectedBrands = tempSelectedBrands.includes(brandId)
      ? tempSelectedBrands.filter((id) => id !== brandId)
      : [...tempSelectedBrands, brandId];

    setTempSelectedBrands(updatedSelectedBrands);

    debouncedUpdateBrands(updatedSelectedBrands);
  };

  return (
    <div className="w-full max-w-lg mx-auto text-black">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`brand-${brand.id}`}
                checked={tempSelectedBrands.includes(brand.id)}
                onChange={() => handleBrandChange(brand.id)}
                className="mr-2"
              />
              <label
                htmlFor={`brand-${brand.id}`}
                className="flex-grow text-sm"
              >
                {brand.brandName}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsFilter;
