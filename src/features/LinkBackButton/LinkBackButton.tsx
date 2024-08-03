import { useRouter } from 'next/navigation';

interface Props {
	href: string;
}

export const LinkBackButton = ({ href = '/' }: Props) => {
	const router = useRouter();

	const handleBackButtonClick = () => {
		router.push(href + location.search);
	};

	return <button onClick={handleBackButtonClick}>{'<'}</button>;
};
