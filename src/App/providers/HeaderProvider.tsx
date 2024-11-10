'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PagesRoutes } from '@/shared/constants';
import { LinkAuthButton } from '@/shared/components/ui/LinkAuthButton/LinkAuthButton';
import { LinkBackButton } from '@/shared/components/ui/LinkBackButton/LinkBackButton';
import { useAuth } from '@/entities/Auth/hooks/useAuth';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
	const { isAuthorized, logOut } = useAuth();
	const { basketManager } = useGetBasketManager();
	const pathname = usePathname();
	const router = useRouter();
	const hideBackButton = pathname === PagesRoutes.HOME;
	const hideAuthButtons =
		pathname === PagesRoutes.REGISTER || pathname === PagesRoutes.LOGIN;

	const handleLogOutClick = () => {
		logOut();
		basketManager.handleClearBasket();
		router.push(PagesRoutes.LOGIN);
	};

	return (
		<>
			<div className='flex'>
				{!hideBackButton && <LinkBackButton href={PagesRoutes.HOME} />}
				{!hideAuthButtons && (
					<LinkAuthButton
						isAuthorized={isAuthorized}
						logInRoute={PagesRoutes.LOGIN}
						registerRoute={PagesRoutes.REGISTER}
						handleLogOutClick={handleLogOutClick}
					/>
				)}
			</div>
			{children}
		</>
	);
};
