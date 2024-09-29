'use client';

import { useVirtualList } from '@/shared/hooks/useVirtualList';
import { ProductItemActions, ProductsItem } from './ProductsItem/ProductsItem';
import { ProductItemDataView } from './types';

type Props = ProductItemActions & {
	products: ProductItemDataView[];
}

export const ProductsVirtualList = ({ products, ...rest }: Props) => {
	const { listRef, visibleItems, containerProps, wrapperProps } =
		useVirtualList<ProductItemDataView>(products, 120);

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
							{...product}
							{...rest}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
