'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PagesRoutes } from '@/shared/constants';
import { LinkAuthButton } from '@/shared/components/ui/LinkAuthButton/LinkAuthButton';
import { LinkBackButton } from '@/shared/components/ui/LinkBackButton/LinkBackButton';
import { useAuth } from '@/entities/Auth/hooks/useAuth';

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
	const { isAuthorized, logOut } = useAuth();
	const pathname = usePathname();
	const router = useRouter();
	const hideBackButton = pathname === PagesRoutes.HOME;
	const hideAuthButtons =
		pathname === PagesRoutes.REGISTER || pathname === PagesRoutes.LOGIN;

	const handleLogOutClick = () => {
		logOut();
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
