"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import { Image } from "antd";
import ProductItem from "@/components/ProductItem";
import BrandList from "@/components/HomePage/BrandList";
import Policy from "@/components/HomePage/Policy";
import { minPrice } from "@/utils";
import ProductSlider from "@/components/ProductSlider";
function HomePage() {
   // Collections
   const [collections, setCollections] = useState([]);

   useEffect(() => {
      const fetchCollections = async () => {
         try {
            const res = await AxiosInstance.get("/collection/all");
            console.log(res);
            if (res.data.statusCode === 200) {
               setCollections(res.data.metadata);
            }
         } catch (error) {
            console.log(error);
         }
      };

      fetchCollections();
   }, []);

   return (
      <div className="">
         <div className="w-full flex items-center justify-center p-4 flex-col">
            <h1>Đây là trang chủ</h1>
            <Link className="text-blue-500" href={"/product"}>
               Chuyển tới trang danh sách sản phẩm
            </Link>
         </div>
         <BrandList></BrandList>
         <Policy></Policy>
         {/* Product Slider */}
         <div>
            <ProductSlider
               title="SẢN PHẨM MỚI"
               apiUrl="http://localhost:8008/api/v1/new-spu/all"
            />
            <ProductSlider
               title="SẢN PHẨM SALE OFF"
               apiUrl="http://localhost:8008/api/v1/sale-off/all"
            />
         </div>
         {/* Collections */}
         {collections.map((collection) => (
            <div
               key={collection.id}
               className="lg:px-[100px] p-4 flex items-center justify-center flex-col w-full"
            >
               <h2 className="p-4 text-2xl font-semibold my-4">
                  {collection.collectionName}
               </h2>
               <div className="grid xl:grid-cols-2 gap-4 grid-cols-1 w-full">
                  {/* Collection Image */}
                  <div className="mx-auto">
                     <Image
                        src={collection.collectionImage}
                        alt={collection.collectionName}
                        className="object-cover max-w-[100%] rounded-lg"
                     />
                  </div>
                  {/* Collection Products */}
                  <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
                     {collection.products.map((product) => (
                        <ProductItem
                           key={product.id}
                           product={product.spu}
                           price={minPrice(product.spu.skuList)}
                        />
                     ))}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}

export default HomePage;
