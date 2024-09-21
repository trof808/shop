'use client';

import { useGetProductsFilters } from './hooks/useGetProductsFilters';

export const ProductsFiltersFeature = () => {
	const { filters, urlFilterManager } = useGetProductsFilters();

	return (
		<>
			{filters.map(filter => (
				<div key={filter.name}>
					<h3>{filter.name}</h3>

					{filter.availableValues.map(property => (
						<label key={property}>
							<input
								type='checkbox'
								value={property}
								checked={filter.isValueChecked(property)}
								onChange={() =>
									urlFilterManager.setFilter(filter.name, property)
								}
							/>
							{property}
						</label>
					))}
				</div>
			))}
		</>
	);
};
