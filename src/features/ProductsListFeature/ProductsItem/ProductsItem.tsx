'use client';

import { memo } from 'react';
import { Product, SettedProducts } from '../types';
import { ProductButtonForBasket } from './components/ProductButtonForBasket';

interface Props {
	product: SettedProducts;
	addToBasketAction: (product: Product) => void;
	removeFromBasketAction: (product: Product) => void;
}

export const ProductsItem = memo(
	({ product, addToBasketAction, removeFromBasketAction }: Props) => {
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
						{!!product.countInBasket && (
							<>
								<ProductButtonForBasket
									variant='remove'
									onClick={() => removeFromBasketAction(product)}
								>
									-
								</ProductButtonForBasket>
								<p className='text-[12px]'>{product.countInBasket}</p>
							</>
						)}

						<ProductButtonForBasket
							variant='add'
							onClick={() => addToBasketAction(product)}
						>
							+
						</ProductButtonForBasket>
					</div>
				</div>
			</div>
		);
	}
);

ProductsItem.displayName = 'ProductsItem';
