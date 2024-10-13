'use client';
import ProductItem from '@/components/ProductItem';
import ProductItemSkeleton from '@/components/ProductItemSkeleton';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from './page/home/HomePage';
import GoToTopButton from '@/components/GoToTopButton';

export default function Home() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8008/api/v1/spu/all'
				); // Thay thế bằng URL API của bạn
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
			<HomePage />
			<GoToTopButton />
		</>
	);
}
