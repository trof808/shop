'use client';

import { LinkBackButton } from '../LinkBackButton/LinkBackButton';
import { useGetProductsFilters } from './hooks/useGetProductsFilters';

export const ProductsFiltersFeature = () => {
	const { filters, urlFilterManager } = useGetProductsFilters();

	console.log(filters);

	return (
		<div>
			<LinkBackButton href='/' />

			{filters.map(filter => (
				<div key={filter.name}>
					<h3>{filter.name}</h3>
					{filter.availableValues.map(property => (
						<label key={property}>
							<input
								type='checkbox'
								value={property}
								checked={filter.isValueChecked(property)}
								// TODO Нужно обновлять стор
								onChange={() => urlFilterManager.setFilter(filter.name, property)}
							/>
							{property}
						</label>
					))}
				</div>
			))}
		</div>
	);
};
