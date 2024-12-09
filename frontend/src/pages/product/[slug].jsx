// import ProductDetail from "@/components/ProductDetail";
import React, { useEffect, useState } from 'react';
import  ProductDetailItem from "@/components/ProductDetailItem";
import RelatedProduct from "@/components/RelatedProduct";
import TabInformation from "@/components/TabInformation";
import Breadcrumb from "@/components/Breadcrumb";
import ImageDesktop from "@/components/ImageDesktop";
import AxiosInstance from "@/utils/axiosInstance";
import { useRouter } from 'next/router';
import { useAppProvider } from '../../contexts/AppProvider';
import NotFound from '../../components/NotFound';


export default function ProductDetailPage() {
  const { query }= useRouter();
  const { isNotFound, setIsNotFound } = useAppProvider();
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
    if (!query.slug) return;
    fetchProductDetail();
  }, [query.slug]);
  const fetchProductDetail = async () => {
    setIsNotFound(false);
    setIsLoading(true);
    AxiosInstance.get(`/spu?slug=${query.slug}`)
      .then((response) => {
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
          setIsNotFound(false);
        }else{
          setIsNotFound(true);
          setIsLoading(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching product detail", error);
        setIsNotFound(true);
        setIsLoading(false);
      });
  };


  if (isNotFound) {
    return <NotFound/>
  }

  return (
    <div>
      <div className="">
        <Breadcrumb categoryId={product.categoryId} />
      </div>
      <div className="lg:px-[200px] px-4 mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* product images */}
        <div className="">
          <ImageDesktop product={product} isLoading={isLoading}></ImageDesktop>
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
  );
}
