'use client';

import React from 'react';
import { Layout } from './Layout';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';

export const BasketListFeature = () => {
	const { basketManager } = useGetBasketManager();

	if (!basketManager.basket.getProductsIds) {
		return <Layout>Basket is empty</Layout>;
	}

	return (
		<section>
			<Layout>
				{basketManager.basket.products.map(product => (
					<div
						key={product.id}
						className='w-64 mb-4 p-4 border border-gray-300 rounded-lg bg-white'
					>
						<h3 className='text-lg font-semibold'>{product.title}</h3>
						<p className='text-gray-700'>{product.description}</p>
						<p className='text-gray-500'>
							Count in basket: {basketManager.basket.getProductCountById(product.id)}
						</p>
					</div>
				))}
			</Layout>
		</section>
	);
};
