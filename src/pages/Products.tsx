import { BasketButtonFeature } from '@/features/BasketButtonFeature/BasketButtonFeature';
import { LinkToFiltersButton } from '@/features/LinkToFiltersButton/LinkToFiltersButton';
import { ProductsListFeature } from '@/features/ProductsListFeature/ProductsListFeature';

export const Products = () => {
	return (
		<>
			<LinkToFiltersButton />

			<div className='mb-[85px]'>
				<ProductsListFeature />
			</div>

			<BasketButtonFeature />
		</>
	);
};
