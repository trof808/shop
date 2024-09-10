'use client';

import React, { memo } from 'react';
import { ProductButtonForBasket } from './components/ProductButtonForBasket';
import { SettedProductsType } from '../types';
import { basketStore } from '@/features/BasketListFeature/stores/basketStore';

interface Props {
	product: SettedProductsType;
	addToBasketAction: () => void;
	removeFromBasketAction: () => void;
}

export const ProductsItem = memo(
	({ product, addToBasketAction, removeFromBasketAction }: Props) => {
		const productsInBasket = basketStore(state => state.productsInBasket);

		const getCountProductInBasket = basketStore(
			state => state.getCountProductInBasket
		);
		const isCanAddItemToBasket = basketStore(
			state => state.isCanAddItemToBasket
		);

		React.useEffect(() => {
			getCountProductInBasket(product);
			isCanAddItemToBasket(product);
		}, [productsInBasket]);

		return (
			<div className='w-64 bg-sky-100 p-6'>
				<div key={product.id}>
					<h2>{product.title}</h2>
					<p>{product.description}</p>
				</div>

				<div className='flex justify-between items-center'>
					<p>
						<b>${product.price.amount}</b>
					</p>

					<div className='flex gap-3 items-center'>
						{!!getCountProductInBasket(product) && (
							<>
								<ProductButtonForBasket
									variant='remove'
									onClick={removeFromBasketAction}
								>
									-
								</ProductButtonForBasket>
								<p className='text-[12px]'>
									{getCountProductInBasket(product)}
								</p>
							</>
						)}

						{isCanAddItemToBasket(product) && (
							<ProductButtonForBasket variant='add' onClick={addToBasketAction}>
								+
							</ProductButtonForBasket>
						)}
					</div>
				</div>
			</div>
		);
	}
);

ProductsItem.displayName = 'ProductsItem';
