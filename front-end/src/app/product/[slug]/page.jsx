"use client";
import React, { useEffect, useState } from "react";
import ProductDetailItem from "@/components/ProductDetailItem";
import RelatedProduct from "@/components/RelatedProduct";
import TabInformation from "@/components/TabInformation";
import Breadcrumb from "@/components/Breadcrumb";
import ImageDesktop from "@/components/detail/ImageDesktop";
import PageTitle from "@/components/PageTitle";
import { useParams } from "next/navigation";
import { metadatasite } from "@/app/layout";
import AxiosInstance from '@/utils/axiosInstance';
export default function DetailProduct() {
  const { slug } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    spuName: "",
    brandName: "",
    images: [],
    categoryId: "",
    spuDescription: "",
    spuAttributes: {},
    spuPrice: 0,
    discount: 0,
    spuNo: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProductDetail();
  }, []);
  const fetchProductDetail = async () => {
    setIsLoading(true);
    AxiosInstance.get(`/spu?slug=${slug}`).then((response) => {
      console.log("response", response);
      const data = response.data;
      if (data.statusCode === 200) {
        const {
          spuName,
          brandName,
          spuAttributes,
          discount,
          images,
          categoryId,
          spuDescription,
          id,
          // skuList,
          spuNo,
        } = data.metadata;
        console.log("spuAttributes", spuAttributes);
        setProduct({
          spuName,
          brandName,
          spuAttributes: JSON.parse(spuAttributes),
          spuPrice: 100001,
          images,
          spuDescription,
          categoryId,
          discount,
          id,
          spuPrice: 10000,
          spuNo,
        });
        setIsLoading(false);
      }
    }).catch((error) => {
      console.error("Error fetching product detail", error);
      setIsLoading(false);
    });
  };

  // get spu_price
  const getSpuPrice = (skuList) => {
    let minPrice = 0;
    skuList.forEach((sku) => {
      if (minPrice === 0) {
        minPrice = sku.skuPrice;
      }
      if (sku.skuPrice < minPrice) {
        minPrice = sku.skuPrice;
      }
    });
    return minPrice;
  };

  return (
    <PageTitle title={"Product Detail"}>
      <div>
        <div className="">
          <Breadcrumb categoryId={product.categoryId} />
        </div>
        <div className="lg:px-[200px] px-4 mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* product images */}
          <div className="">
            <ImageDesktop
              product={product}
              isLoading={isLoading}
            ></ImageDesktop>
          </div>
          <div>
            <ProductDetailItem
              handleProductImageClick={() => {
                setShowModal(!showModal);
              }}
              product={product}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="mt-[20px]">
          <TabInformation
            product={product}
            isLoading={isLoading}
          ></TabInformation>
          <RelatedProduct categories={product.categoryId} />
        </div>
      </div>
    </PageTitle>
  );
}
