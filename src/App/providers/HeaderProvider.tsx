'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { PagesRoutes } from '@/shared/constants';
import { LinkAuthButton } from '@/shared/components/ui/LinkAuthButton/LinkAuthButton';
import { LinkBackButton } from '@/shared/components/ui/LinkBackButton/LinkBackButton';

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const hideBackButton = pathname === PagesRoutes.HOME;
	const hideAuthButtons =
		pathname === PagesRoutes.REGISTER || pathname === PagesRoutes.LOGIN;

	return (
		<>
			<div className='flex'>
				{!hideBackButton && <LinkBackButton href={PagesRoutes.HOME} />}
				{!hideAuthButtons && <LinkAuthButton />}
			</div>
			{children}
		</>
	);
};
