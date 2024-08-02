import Link from 'next/link';

export const LinkToFiltersButton = () => {
	return (
		<Link href='/filters'>
			<button>Перейти к фильтрам</button>
		</Link>
	);
};
