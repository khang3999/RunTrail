"use client";
import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem";
import Slider from "react-slick";
import ProductItemSkeleton from "../ProducItemSkeleton";
import { useAppProvider } from "@/contexts/AppProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./RelatedProduct.module.css";
import "./RelatedProduct.css";

const RelatedProduct = ({ categories }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useAppProvider();

  useEffect(() => {
    setIsLoading(true);
    if (categories) {
      fetch(
        `http://localhost:8008/api/v1/spu/random?category=${categories}&number=6`,
      )
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.metadata);
        });
      setIsLoading(false);
    }
  }, [categories]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  if (isLoading) {
    return (
      <>
        <div>
          <h1 className={styles.title}>SẢN PHẨM LIÊN QUAN</h1>
          <div className={styles.container}>
            <div className={styles.grid}>
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
          <h1 className={styles.title}>SẢN PHẨM LIÊN QUAN</h1>
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className={styles.title}>SẢN PHẨM LIÊN QUAN</h1>
          <div className={styles.container}>
            <div className="w-4/5 h-96">
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

export default RelatedProduct;
