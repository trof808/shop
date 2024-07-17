import { ProductsVirtualList } from './ProductsVirtualList';

export const ProductsContainer = () => {
	// TODO: mock-data
	const products = Array.from({ length: 1000 }, (_, index) => ({
		id: index,
		name: `Product ${index}`,
		price: (Math.random() * 100).toFixed(2),
	}));

	return <ProductsVirtualList products={products} />;
};
