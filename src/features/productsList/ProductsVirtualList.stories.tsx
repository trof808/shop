import { ProductsVirtualList } from './ProductsVirtualList';

const generateProducts = (count: number) =>
	Array.from({ length: count }, (_, index) => ({
		id: index,
		name: `Product ${index}`,
		tags: ['autodocs'],
		price: (Math.random() * 100).toFixed(2),
	}));

const products = generateProducts(1000);

export default {
	component: ProductsVirtualList,
	title: 'ProductsVirtualList',
};

export const Default = {
	args: {
		products,
	},
};
