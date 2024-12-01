"use client";
import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem";
import ProductItemSkeleton from "../ProducItemSkeleton";
import { useAppProvider } from "@/contexts/AppProvider";
import styles from "./ProductSlider.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ProductSlider.module.css";

const ProductSlider = ({ title, apiUrl }) => {
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const { isMobile } = useAppProvider();

   useEffect(() => {
      setIsLoading(true);
      if (apiUrl) {
         fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
               if (data.statusCode === 200) {
                  setProducts(data.metadata);
               }
               setIsLoading(false);
            })
            .catch((error) => {
               console.error("Error fetching data:", error);
               setIsLoading(false);
            });
      }
   }, [apiUrl]);

   if (isLoading) {
      return (
         <>
            <div>
               <h2 className={styles.title}>{title}</h2>
               <div className={styles.container}>
                  <div className={styles.grid} style={{ marginBottom: 40 }}>
                     {Array.from({ length: isMobile ? 6 : 4 }, (_, index) => (
                        <ProductItemSkeleton key={index} />
                     ))}
                  </div>
               </div>
            </div>
         </>
      );
   }

   return (
      <div>
         {isMobile ? (
            <div>
               <h2 className={styles.title}>{title}</h2>
               <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
                  {products.map((product, index) => (
                     <ProductItem key={index} product={product} />
                  ))}
               </div>
            </div>
         ) : (
            <div className="mb-[60px]">
               <h2 className={styles.title}>{title}</h2>
               <div className={styles.container}>
                  <div className="w-4/5 h-100">
                     <Carousel
                        draggable={true}
                        showDots={false}
                        infinite={true}
                        autoPlaySpeed={2000}
                        keyBoardControl={true}
                        customTransition="transform 0.2s ease-out"
                        transitionDuration={800}
                        autoPlay={true}
                        containerClass="carousel-container"
                        dotListClass="custom-dot-list-style"
                        responsive={{
                           desktop: {
                              breakpoint: {
                                 max: 3000,
                                 min: 1024,
                              },
                              items: 4,
                              partialVisibilityGutter: 40,
                           },
                        }}
                     >
                        {products && products.length > 0 && products.map((product) => (
                           <div className={styles.slickslide} key={product.id}>
                              <ProductItem product={product} />
                           </div>
                        ))}
                     </Carousel>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ProductSlider;
