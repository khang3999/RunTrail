'use client'
import TabInformation from '@/components/TabInformation'
import TabInformationSkeleton from '@/components/TabInformationSkeleton';
import React from 'react'
import RelatedProduct from '@/components/RelatedProduct'
import { useProductProvider } from '@/contexts/ProductProvider';

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

      <RelatedProduct categories={8} isLoading={isLoading} />

    </div>
  )
}
