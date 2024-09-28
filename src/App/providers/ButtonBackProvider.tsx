'use client';

import { LinkBackButton } from '@/shared/components/ui/LinkBackButton/LinkBackButton';
import React from 'react';
import { usePathname } from 'next/navigation';
import { PagesRoutes } from '@/shared/constants';

export const ButtonBackProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const pathname = usePathname();
	const showBackButton =
		pathname === PagesRoutes.FILTERS || pathname === PagesRoutes.BASKET;

	return (
		<>
			{showBackButton && <LinkBackButton href={PagesRoutes.HOME} />}
			{children}
		</>
	);
};
