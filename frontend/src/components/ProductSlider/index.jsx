"use client";
import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem";
import Slider from "react-slick";
import ProductItemSkeleton from "../ProducItemSkeleton";
import { useAppProvider } from "@/contexts/AppProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ProductSlider.module.css";
import "./ProductSlider.css";

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
          console.log({ title }, data.metadata);
          setProducts(data.metadata);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }
  }, [apiUrl]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };
  if (isLoading) {
    return (
      <>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.container}>
            <div className={styles.grid} style={{ marginBottom: 40 }}>
              {Array.from({ length: products.length }, (_, index) => (
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
          <h1 className={styles.title}>{title}</h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
            {products.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-[60px]">
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.container}>
            <div className="w-4/5 h-100">
              <Slider {...settings}>
                {products.map((product) => (
                  <div className={styles["slick-slide"]} key={product.id}>
                    <ProductItem product={product} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
