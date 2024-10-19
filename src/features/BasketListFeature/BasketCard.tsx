import React from 'react';

interface BasketCardProps {
	title: string;
	price: number;
	description: string;
	countInBasket: number;
}

export const BasketCard = ({
	title,
	price,
	description,
	countInBasket,
}: BasketCardProps) => {
	return (
		<div className='w-64 h-[200px] p-4 border border-gray-300 rounded-lg bg-white'>
			<h3 className='text-lg font-semibold'>{title}</h3>
			<p className='text-gray-700 line-clamp-3'>{description}</p>
			<p className='text-gray-400'>Price per piece: {price}</p>
			<p className='text-gray-400'>Count in basket: {countInBasket}</p>
			<p className='text-gray-600 underline'>
				Total price: {price * countInBasket}
			</p>
		</div>
	);
};
