import React from 'react';
import { LinkBackButton } from '../LinkBackButton/LinkBackButton';

// Можно даже этот Layout сделать провайдером общим
export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col items-start'>
			{
				/* Возможно вот эту кнопку лучше вынести на уровень страницы.
				И сделать ее конфигурируемой, чтобы она сама знала, на каких страницах отображаться по конфигу */
			}
			<LinkBackButton href='/' />
			{children}
		</div>
	);
};
