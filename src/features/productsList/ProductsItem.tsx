import { memo } from 'react';
import { Product } from './types';

interface Props {
	product: Product;
}

export const ProductsItem = memo(({ product }: Props) => {
	return (
		<div>
			<div key={product.id}>
				<h2>{product.title}</h2>
				<p>
					Price: {product.price.amount} {product.price.currency}
				</p>
			</div>
		</div>
	);
});

ProductsItem.displayName = 'ProductsItem';
