import React from "react";
import BrandsFilter from "@/components/Filters/BrandsFilter";
import FilterItem from "../Filters/FilterItem";
import PriceFilter from "../Filters/PriceFilter";
import CategoryFilter from "../Filters/CategoryFilter";
import SizesFilter from "../Filters/SizesFilter";
import CategoryFilterV2 from "../Filters/CategoryFilterV2";

const SideBarProduct = ({ categoryId }) => {
  return (
    <div className="w-full h-auto">
      {/* Filter by price */}
      <div className="mt-4">
      <FilterItem title={"Danh Mục"}>
         <CategoryFilterV2 categoryId={categoryId} />
        </FilterItem>
        <FilterItem title={"Thương Hiệu"}>
          <BrandsFilter categoryId={categoryId} />
        </FilterItem>

        <FilterItem title={"Giá"}>
          {/* Range price */}
          <div>
            <PriceFilter />
          </div>
        </FilterItem>
        <FilterItem title={"Kích Thước"}>
          <SizesFilter categoryId={categoryId} />
        </FilterItem>       
      </div>
    </div>
  );
};

export default SideBarProduct;
