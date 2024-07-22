'use client';

import { useVirtualList } from '@/shared/hooks/useVirtualList';
import { ProductsItem } from './ProductsItem';

interface Props {
	products: any[];
}

export const ProductsVirtualList = ({ products }: Props) => {
	const { listRef, visibleItems, containerProps, wrapperProps } =
		useVirtualList(products, 48);

	return (
		<div ref={listRef} className='h-[200px] overflow-y-auto'>
			<div {...containerProps}>
				<div {...wrapperProps}>
					{visibleItems.map(product => (
						<ProductsItem key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};
