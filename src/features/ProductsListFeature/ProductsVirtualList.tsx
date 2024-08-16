'use client';

import { useVirtualList } from '@/shared/hooks/useVirtualList';
import { ProductsItem } from './ProductsItem/ProductsItem';
import { SettedProductsType } from './types';

interface Props {
	products: SettedProductsType[];
}

export const ProductsVirtualList = ({ products }: Props) => {
	const { listRef, visibleItems, containerProps, wrapperProps } =
		useVirtualList<SettedProductsType>(products, 120);

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
							addToBasketAction={product.addToBasketAction}
							removeFromBasketAction={product.removeFromBasketAction}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
