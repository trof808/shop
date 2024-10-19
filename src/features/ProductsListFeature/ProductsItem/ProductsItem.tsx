'use client';

import React, { memo } from 'react';
import { ProductButtonForBasket } from './components/ProductButtonForBasket';
import { ProductItemActions, ProductItemDataView } from '../types';

export type ProductsItemProps = ProductItemDataView & ProductItemActions;

export const ProductsItem = memo(
	({
		title,
		id,
		price,
		description,
		countInBasket,
		addToBasket,
		removeFromBasket,
		canAdd,
		canRemove,
	}: ProductsItemProps) => {
		return (
			<div data-testid='productCard' className='w-64 h-[200px] bg-sky-100 p-6'>
				<div key={id}>
					<h2 className='text-lg font-semibold'>{title}</h2>
					<p className='text-gray-700 line-clamp-4'>{description}</p>
				</div>

				<div className='flex justify-between items-center'>
					<p>
						<b>${price.amount}</b>
					</p>

					<div className='flex gap-3 items-center'>
						{canRemove(id) && (
							<>
								<ProductButtonForBasket
									data-testid='removeFromBasketBtn'
									variant='remove'
									onClick={() => removeFromBasket(id)}
								>
									-
								</ProductButtonForBasket>
							</>
						)}

						{Boolean(countInBasket) && (
							<p data-testid='countInBasket' className='text-[12px]'>
								{countInBasket}
							</p>
						)}

						<ProductButtonForBasket
							data-testid='addToBasketBtn'
							variant='add'
							onClick={() => addToBasket(id)}
							disabled={!canAdd(id)}
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
