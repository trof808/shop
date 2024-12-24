import React from 'react';
import { PagesRoutes } from '@/shared/constants';
import { useNavigate } from 'react-router';

interface Props {
	href: string;
}

export const LinkBackButton = ({ href = PagesRoutes.HOME }: Props) => {
	const navigate = useNavigate();

	const handleBackButtonClick = () => {
		navigate(href + location.search);
	};

	return (
		<button className='block ml-2 p-[5px]' onClick={handleBackButtonClick}>
			{'<'}
		</button>
	);
};
