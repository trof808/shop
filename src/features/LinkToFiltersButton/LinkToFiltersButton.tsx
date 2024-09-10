import Link from 'next/link';

export const LinkToFiltersButton = () => {
	return <Link href={`/filters${location.search}`}>Go to the filters</Link>;
};
