import { PagesRoutes } from '@/shared/constants';
import { useRouter } from 'next/navigation';

interface Props {
	href: string;
}

export const LinkBackButton = ({ href = PagesRoutes.HOME }: Props) => {
	const router = useRouter();

	const handleBackButtonClick = () => {
		router.push(href + location.search);
	};

	return (
		<button className='block ml-2 p-[5px]' onClick={handleBackButtonClick}>
			{'<'}
		</button>
	);
};
