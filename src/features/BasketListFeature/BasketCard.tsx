import React from 'react';

interface BasketCardProps {
	title: string;
	description: string;
	countInBasket: number;
}

export const BasketCard = ({
	title,
	description,
	countInBasket,
}: BasketCardProps) => {
	return (
		<div className='w-64 p-4 border border-gray-300 rounded-lg bg-white'>
			<h3 className='text-lg font-semibold'>{title}</h3>
			<p className='text-gray-700'>{description}</p>
			<p className='text-gray-500'>Count in basket: {countInBasket}</p>
		</div>
	);
};
