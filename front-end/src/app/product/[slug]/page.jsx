'use client';
import React, { useEffect, useState } from 'react'
import ProductDetailItem from '@/components/ProductDetailItem';
import { useParams } from 'next/navigation';
import { metadatasite } from '@/app/layout';
export default function DetailProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState({
    spuName: '',
    brand: {
      brandName: ''
    },
    spuAttributes: {},
    spuPrice: 0,
    discount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    setIsLoading(true)
    const response = await fetch(`http://localhost:8008/api/v1/spu?slug=${slug}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    if (data.statusCode === 200) {
      const { spuName, brand, spuAttributes,id,discount} = data.metadata;
      setProduct({
        spuName,
        brand,
        spuAttributes: JSON.parse(spuAttributes),
        spuPrice: 100001,
        discount,
      });
      metadatasite.title = spuName;
      setIsLoading(false)
    }
  }


  return (
    <div>
      <div className='md:container md:px-[200px] mt-3 py-3 bg-slate-300 h-[100px]'>
        <p><span>Trang chủ </span> <span>Đồ Nam</span>  <span>Áo Chạy Bộ Nam</span></p>
      </div>
      <div className='px-[200px] mt-3 h-[300px] grid grid-cols-2 gap-4'>
        {/* product images */}
        <div className='bg-slate-200'>
        </div>
        <div>
          <ProductDetailItem product={product} setProduct={setProduct} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}




