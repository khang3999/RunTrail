'use client';
import React, { useEffect, useState } from 'react'
import ProductDetailItem from '@/components/ProductDetailItem';
import TabInformation from '@/components/TabInformation';
import RelatedProduct from '@/components/RelatedProduct';

export default function DetailProduct() {

  const [product, setProduct] = useState({
    spuName: '',
    brand: {
      brandName: ''
    },
    categoryId:'',
    spuDescription:'',
    spuAttributes: {}
  });
  const [isLoading, setIsLoading] = useState(true);

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    setIsLoading(true)
    const response = await fetch('http://localhost:8008/api/v1/spu?id=42')
    const data = await response.json()
    if (data.statusCode === 200) {
      const { spuName, brand, spuAttributes, spuDescription,categoryId } = data.metadata;
      setProduct({
        spuName,
        brand,
        spuDescription,
        categoryId,
        spuAttributes: JSON.parse(spuAttributes)
      });
      setIsLoading(false)
    }
  }

  const handleAttributeChange = () => {
    console.log('change attribute')
  }

  return (
    <div className='pb-[200px]'>
      <div className='px-[200px] mt-3 h-[300px] grid grid-cols-2 gap-4 mb-[200px]'>
        {/* product images */}
        <div className='bg-slate-200'>
        </div>
        <div>
          <ProductDetailItem product={product} isLoading={isLoading} />
        </div>
      </div>
      <TabInformation product={product} isLoading={isLoading}></TabInformation>

      <RelatedProduct categories={product.categoryId} isLoading={isLoading} />

    </div>
  )
}




