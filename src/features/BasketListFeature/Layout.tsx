import React from 'react';
import { LinkBackButton } from '../LinkBackButton/LinkBackButton';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col items-start'>
			<LinkBackButton href='/' />
			{children}
		</div>
	);
};
