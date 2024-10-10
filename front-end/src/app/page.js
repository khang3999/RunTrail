"use client"
import ProductItem from "@/components/productItem";
import ProductItemSkeleton from "@/components/productItemSkeleton";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8008/api/v1/spu/all'); // Thay thế bằng URL API của bạn
        console.log('done');
        setProducts(response.data.metadata.content);
      } catch (err) {
        setError(err.message);
        console.log('error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    
  }, []);
  return (
    <>
      {loading ? (  // Kiểm tra trạng thái loading
        <div className='grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-6'>
          {/* Hiển thị nhiều skeletons */}
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-6'>
          {/* Product item */}
          {products.map((product) => {
            return (
              <>
              <ProductItem key={product.id} product={product}></ProductItem>
              </>
            )
          })
          }
        </div >)
      }
      {/* <HomeScreen /> */}
      {/* <GoToTopButton /> */}
    </>
  );
}
