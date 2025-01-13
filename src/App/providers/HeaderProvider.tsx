import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PagesRoutes } from '@/shared/constants';
import { LinkAuthButton } from '@/shared/components/ui/LinkAuthButton/LinkAuthButton';
import { LinkBackButton } from '@/shared/components/ui/LinkBackButton/LinkBackButton';
import { useAuth } from '@/entities/Auth/hooks/useAuth';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';

export const HeaderProvider = ({ children }: { children?: React.ReactNode }) => {
	const { isAuthorized, logOut } = useAuth();
	const { basketManager } = useGetBasketManager();
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogOutClick = () => {
		logOut();
		basketManager.handleClearBasket();
		navigate(PagesRoutes.LOGIN);
	};
	return (
		<>
			<div className='flex'>
				<LinkBackButton href={PagesRoutes.HOME} />
				<LinkAuthButton
					isAuthorized={isAuthorized}
					logInRoute={PagesRoutes.LOGIN}
					registerRoute={PagesRoutes.REGISTER}
					handleLogOutClick={handleLogOutClick}
				/>
			</div>
			{children}
		</>
	);
};
