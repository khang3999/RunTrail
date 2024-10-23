'use client'
import TabInformation from '@/components/TabInformation'
import TabInformationSkeleton from '@/components/TabInformationSkeleton';
import { useProductProvider } from '@/contexts/ProductProvider';
import logo_shop from '@/assets/images/logo_shop.png'
import React from 'react'
import ReactImageMagnify from 'react-image-magnify';
import '@/assets/css/style.css'
export default function DetailProduct() {
  const {
    products,
    isLoading,
    currentPage,
    setCurrentPage,
    productsPerPage,
    totalPages,
    currentProducts,
  } = useProductProvider();
  if (isLoading) {
    return (
      <div>
        <div >

          <TabInformationSkeleton />

        </div>
      </div>
    );
  }
  return (
    <div>DetailProduct

      <TabInformation ></TabInformation>

    </div>

  )
}
