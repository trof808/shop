'use client';

import { useVirtualList } from '@/shared/hooks/useVirtualList';
import { ProductItemActions, ProductItemDataView, ProductsItem } from './ProductsItem/ProductsItem';

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
							id={product.id}
							title={product.title}
							description={product.description}
							price={product.price}
							countInBasket={product.countInBasket}
							{...rest}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
