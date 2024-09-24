'use client';

import { PagesRoutes } from '@/shared/constants';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FilterIcon } from '@/shared/icons/FilterIcon';

export const LinkToFiltersButton = () => {
	const searchParams = useSearchParams();

	return (
		<Link href={`${PagesRoutes.FILTERS}?${searchParams}`}>
			<div className='flex justify-center'>
				<FilterIcon />
			</div>
		</Link>
	);
};
