"use client";
import Link from "next/link";
import React from "react";
import { FaStarHalfStroke, FaStar } from "react-icons/fa6";
import "@/assets/css/addToCartBtn.css";

function ProductItem(props) {
   const product = props.product;
   const price = props.price;
   const brand = props.brand;

   // Xử lí tiền theo định dạng
   const numeral = require("numeral");
   //Làm tròn lên
   function roundToNearest500(amount) {
      // Chia cho 500, làm tròn lên, rồi nhân lại với 500
      return Math.ceil(amount / 500) * 500;
   }
   // Định dạng
   function formatPrice(number) {
      if (number <= 1000) {
         return "1.000";
      }
      return numeral(number).format("0,0").replace(/,/g, ".");
   }

   return (
      <>
         <div className="group product-item rounded border-2">
            {/* Image */}
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
               <Link href={`/product/${product.slug}`} shallow className="title">
                  <div className="image-wrap relative w-full h-[180px] bg-white flex justify-center items-center">
                     {product && product.images && product.images.length > 0 ? (
                        <>
                           <img
                              src={product.images[0].imgUrl}
                              alt="Front of men&#039;s Basic Tee in black."
                              className="absolute thumnail-1 object-cover object-center w-full"
                           ></img>
                           <img
                              src={product.images[1].imgUrl}
                              alt="Front of men&#039;s Basic Tee in black."
                              className="absolute thumnail-2 object-cover object-center w-full"
                           ></img>
                        </>
                     ) : (
                        <>
                           <img
                              src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg"
                              alt="Front of men&#039;s Basic Tee in black."
                              className="absolute thumnail-1 object-cover object-center w-full h-[250px]"
                           ></img>
                           <img
                              src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg"
                              alt="Front of men&#039;s Basic Tee in black."
                              className="absolute thumnail-2 object-cover object-center w-full h-[250px]"
                           ></img>
                        </>
                     )}

                     {product.discount ? (
                        <span className="text-center items-center rounded-md bg-red-700 px-2 py-1 text-sm font-medium text-white ring-1 ring-inset ring-red-600/10 z-1 absolute top-2 left-2">
                           -{product.discount}%
                        </span>
                     ) : (
                        ""
                     )}
                  </div>
               </Link>
            </div>
            {/* Information */}
            <div className="group px-[15px] my-4">
               {/* Body */}
               <div className="item-body">
                  <p className="brand font-extralight italic text-gray-400 mb-1">
                     {product.brandName}
                  </p>
                  <Link
                     href={`/product/${product.slug}`}
                     className="title font-semibold line-clamp-1 text-ellipsis"
                  >
                     {product.spuName}
                  </Link>

                  {/*Rating*/}
                  <div className="rating flex flex-row mt-2">
                     <FaStar className="text-yellow-300" />
                     <FaStar className="text-yellow-300" />
                     <FaStar className="text-yellow-300" />
                     <FaStar className="text-yellow-300" />
                     <FaStarHalfStroke className="text-yellow-300" />
                  </div>
                  {/* Price */}
                  <div className="price flex flex-col items-start pt-3">
                     <p className="flex-1 text-gray-400 line-clamp-1">
                        {product.discount ? (
                           <s>{formatPrice(price ? price : product.spuPrice)} VNĐ</s>
                        ) : (
                           <br></br>
                        )}
                     </p>
                     <p className="flex-1 text-lg font-semibold text-red-600 line-clamp-1">
                        {product.discount
                           ? formatPrice(
                              price ? (price * (100 - product.discount)) / 100 : (product.spuPrice * (100 - product.discount)) / 100,
                           )
                           : formatPrice(product.spuPrice)}{" "}
                        VNĐ
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default ProductItem;
