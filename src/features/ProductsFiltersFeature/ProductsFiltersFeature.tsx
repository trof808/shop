'use client';

import { useEffect, useState } from 'react';
import { LinkBackButton } from '../LinkBackButton/LinkBackButton';
import { useGetProductsFilters } from './hooks/useGetProductsFilters';

export const ProductsFiltersFeature = () => {
	const { filters, selectedFilters, saveFilters } = useGetProductsFilters();
	const [checkedFilters, setCheckedFilters] = useState<{
		[filterId: string]: number[];
	}>(selectedFilters);

	useEffect(() => {
		setCheckedFilters(selectedFilters);
	}, [selectedFilters]);

	const handleCheckboxChange = (filterId: string, propertyId: number) => {
		setCheckedFilters(prev => {
			const currentFilterValues = prev[filterId] || [];
			const isChecked = currentFilterValues.includes(propertyId);

			const updatedFilters = {
				...prev,
				[filterId]: isChecked
					? currentFilterValues.filter(id => id !== propertyId)
					: [...currentFilterValues, propertyId],
			};

			if (!updatedFilters[filterId].length) {
				delete updatedFilters[filterId];
			}

			return updatedFilters;
		});
	};

	return (
		<div>
			<LinkBackButton href='/' />

			{filters.map(filter => (
				<div key={filter.id}>
					<h3>{filter.title}</h3>
					{filter.properties.map(property => (
						<label key={property.id}>
							<input
								type='checkbox'
								value={property.title}
								checked={
									checkedFilters[filter.id]?.includes(property.id) || false
								}
								onChange={() => handleCheckboxChange(filter.id, property.id)}
							/>
							{property.title}
						</label>
					))}
				</div>
			))}

			{!!Object.keys(checkedFilters).length && (
				<button onClick={() => saveFilters(checkedFilters)}>Show</button>
			)}
		</div>
	);
};
