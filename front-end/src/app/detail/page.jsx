"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function DetailProduct() {
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');

    const [products, setProducts] = useState(null);

    useEffect( () =>  {
     const fetchProduct = async () => {
        if (productId) {
          const response = await fetch(
            `http://localhost:8008/api/v1/sku/bySpu/${productId}`
          );
          const data = await response.json();
          setProducts(data)
        }
      }
        fetchProduct()
    }, [productId]);

    if (!products) {
        return <p>Loading...</p>;
    }

    
    return (
        <div>
            <h1>{products[0].skuName}</h1>
        </div>
    );
}

export default DetailProduct;
