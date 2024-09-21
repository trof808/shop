'use client';

import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';
import { PagesRoutes } from '@/shared/constants';
import { BasketIcon } from '@/shared/icons/BasketIcon';
import { ArrowRight } from '@/shared/icons/ArrowRight';
import Link from 'next/link';

export const BasketButtonFeature = () => {
	const { basketManager } = useGetBasketManager();
	const totalPrice = basketManager.basket.totalPrice;

	if (!totalPrice) {
		return null;
	}

	return (
		<div className='fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit bg-[#d9d9d9] rounded-[16px]'>
			<Link className='block p-[13px] min-w-[300px]' href={PagesRoutes.BASKET}>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-[5px]'>
						<BasketIcon />
						<span>{totalPrice.toFixed(2)} $</span>
					</div>

					<ArrowRight />
				</div>
			</Link>
		</div>
	);
};
