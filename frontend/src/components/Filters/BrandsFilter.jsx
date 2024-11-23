"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useProductProvider } from "@/contexts/ProductProvider";
import AxiosInstance from "@/utils/axiosInstance";
import debounce from "lodash.debounce";

const BrandsFilter = ({ categoryId }) => {
  const [brands, setBrands] = useState([]);
  const [tempSelectedBrands, setTempSelectedBrands] = useState([]);
  const { selectedBrands, setSelectedBrands, filterProductsByBrand } =
    useProductProvider();

  useEffect(() => {
    console.log("Selected brands:", selectedBrands);
    setTempSelectedBrands(selectedBrands);
  }, [selectedBrands]);

  useEffect(() => {
    // use Axios Instance
    const fetchBrandsData = async () => {
      AxiosInstance.get(`/brands/by-category?categoryId=${categoryId}`).then(
        (res) => {
          const data = res.data;
          if (data.statusCode === 200) {
            setBrands(data.metadata);
          } else {
            console.error("Error fetching brands:", error);
          }
        },
      );
    };

    if (categoryId) {
      fetchBrandsData();
    }
  }, [categoryId]);

  const debouncedUpdateSelectedBrands = useCallback(
    debounce((updatedBrands) => {
      setSelectedBrands(updatedBrands);
    }, 2000),
    [],
  );

  useEffect(() => {
    filterProductsByBrand(selectedBrands);
  }, [setSelectedBrands]);

  const handleBrandChange = (brandId) => {
    const updatedSelectedBrands = tempSelectedBrands.includes(brandId)
      ? tempSelectedBrands.filter((id) => id.toString() !== brandId)
      : [...tempSelectedBrands, brandId];

    setTempSelectedBrands(updatedSelectedBrands);
    debouncedUpdateSelectedBrands(updatedSelectedBrands);
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
                checked={tempSelectedBrands.includes(brand.id.toString())}
                onChange={() => handleBrandChange(brand.id.toString())}
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