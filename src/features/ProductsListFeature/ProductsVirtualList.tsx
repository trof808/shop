'use client';

import { useVirtualList } from '@/shared/hooks/useVirtualList';
import { ProductsItem } from './ProductsItem/ProductsItem';
import { Product, SettedProducts } from './types';

interface Props {
	products: SettedProducts[];
	addToBasketAction: (product: Product) => void;
	removeFromBasketAction: (product: Product) => void;
}

export const ProductsVirtualList = ({
	products,
	addToBasketAction,
	removeFromBasketAction,
}: Props) => {
	const { listRef, visibleItems, containerProps, wrapperProps } =
		useVirtualList(products, 120);

	return (
		<div ref={listRef} className='h-[700px] overflow-y-auto'>
			<div {...containerProps}>
				<div
					{...wrapperProps}
					className='grid gap-2 grid-cols-1 justify-items-center'
				>
					{visibleItems.map(product => (
						<ProductsItem
							key={product.id}
							product={product}
							addToBasketAction={addToBasketAction}
							removeFromBasketAction={removeFromBasketAction}
						/>
					))}
				</div>
			</div>
		</div>
	);
};