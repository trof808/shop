import { BasketButtonFeature } from '@/features/BasketButtonFeature/BasketButtonFeature';
import { LinkToFiltersButton } from '@/features/LinkToFiltersButton/LinkToFiltersButton';
import { ProductsListFeature } from '@/features/ProductsListFeature/ProductsListFeature';

export const Products = () => {
	return (
		<>
			<div className='flex p-4 pt-0 flex-col gap-4'>
				<LinkToFiltersButton />

				<div className='mb-[85px]'>
					<ProductsListFeature />
				</div>
			</div>

			<BasketButtonFeature />
		</>
	);
};
