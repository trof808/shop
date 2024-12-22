'use client';

import { PagesRoutes } from '@/shared/constants';
import { Link, useLocation } from 'react-router';
import { FilterIcon } from '@/shared/icons/FilterIcon';

export const LinkToFiltersButton = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	console.log(searchParams);

	return (
		<Link to={`${PagesRoutes.FILTERS}?${searchParams.toString()}`}>
			<div className='flex justify-center'>
				<FilterIcon />
			</div>
		</Link>
	);
};
