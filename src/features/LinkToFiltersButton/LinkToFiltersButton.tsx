import { useRouter } from 'next/navigation';

export const LinkToFiltersButton = () => {
	const router = useRouter();

	const handleBackButtonClick = () => {
		router.push('/filters' + location.search);
	};

	return <button onClick={handleBackButtonClick}>Go to the filters</button>;
};
