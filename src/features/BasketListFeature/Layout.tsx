import React from 'react';
import { LinkBackButton } from '../../shared/components/LinkBackButton/LinkBackButton';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<LinkBackButton href='/' />
			{children}
		</>
	);
};
