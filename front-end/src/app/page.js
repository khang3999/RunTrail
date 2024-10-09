"use client"
import ProductItem from "@/components/productItem";
import ProductItemSkeleton from "@/components/productItemSkeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.example.com/products'); // Thay thế bằng URL API của bạn
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <div className='grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-6'>
        {/* Product item */}
        <ProductItem></ProductItem>
        <ProductItemSkeleton />
      </div>
      <HomeScreen />
      <GoToTopButton />
    </>
  );
}
