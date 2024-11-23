"use client";
import React, { useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useProductProvider } from "@/contexts/ProductProvider";

const PriceFilter = () => {
   const [range, setRange] = useState([0, 20000000]);
   const [minRange, setMinRange] = useState(0);
   const [maxRange, setMaxRange] = useState(20000000);
   const [minValue, setMinValue] = useState(0);
   const [maxValue, setMaxValue] = useState(20000000);
   const minRef = useRef();
   const maxRef = useRef();
   const { } = useProductProvider();

   const { setMinPrice, setMaxPrice, errorMessage, setErrorMessage } =
      useProductProvider();

   const handleFilterProducts = async () => {
      setMinPrice(range[0]);
      setMaxPrice(range[1]);
   };

   const handleRangeChange = (value) => {
      setErrorMessage("");
      setRange(value);

      setMinValue(value[0]);
      setMaxValue(value[1]);

      if (minRef.current && maxRef.current) {
         minRef.current.style.border = "1px solid rgb(209 213 219)";
         maxRef.current.style.border = "1px solid rgb(209 213 219)";

         if (value[0] >= value[1]) {
            minRef.current.style.border = "1px solid red";
            maxRef.current.style.border = "1px solid red";
            setErrorMessage("Giá tối thiểu phải nhỏ hơn giá tối đa");
         }
      }
   };

   return (
      <div className="w-full max-w-lg mx-auto p-4">
         <div className="px-2 mb-4">
            <Slider
               step={1000}
               range
               min={0}
               max={20000000}
               value={range}
               onChange={handleRangeChange}
               trackStyle={[{ backgroundColor: "#3b82f6" }]}
               handleStyle={[{ borderColor: "#3b82f6" }, { borderColor: "#3b82f6" }]}
            />
         </div>
         <div className="flex items-center justify-between w-full mb-4 text-gray-700">
            <span>{range[0].toLocaleString("vi-VN")}đ</span>
            <span>{range[1].toLocaleString("vi-VN")}đ</span>
         </div>
         <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <input
               className="w-full sm:w-1/2 outline-none border border-gray-300 rounded-lg p-2"
               type="number"
               value={minValue}
               min={"0"}
               ref={minRef}
               max={"20000000"}
               onChange={(e) => {
                  setMinValue((prev) => {
                     return Number(e.target.value);
                  });

                  if (Number(e.target.value) > maxRange) {
                     e.target.style.border = "1px solid red";
                     setErrorMessage("Giá không được vượt quá 20,000,000đ");
                  } else {
                     e.target.style.border = "1px solid rgb(209 213 219)";
                     handleRangeChange([Number(e.target.value), range[1]]);
                  }
               }}
            />
            <span className="text-gray-500"> - </span>
            <input
               className="w-full sm:w-1/2 outline-none border border-gray-300 rounded-lg p-2"
               type="number"
               ref={maxRef}
               value={maxValue}
               min={"0"}
               max={"20000000"}
               onChange={(e) => {
                  setMaxValue((prev) => {
                     return Number(e.target.value);
                  });

                  if (Number(e.target.value) > maxRange) {
                     e.target.style.border = "1px solid red";
                     setErrorMessage("Giá tối đa không được vượt quá 20,000,000đ");
                  } else {
                     e.target.style.border = "1px solid rgb(209 213 219)";
                     handleRangeChange([range[0], Number(e.target.value)]);
                  }
               }}
            />
         </div>
         {/* Message */}
         <div className="text-sm font-semibold mt-2 text-red-500 text-center">
            {errorMessage && <p>{errorMessage}</p>}
         </div>
         <button
            className="uppercase mt-4 py-2 rounded-lg border-gray-300 w-full border text-black transition-all"
            onClick={() => {
               handleFilterProducts();
            }}
         >
            SEARCH
         </button>
      </div>
   );
};

export default PriceFilter;
