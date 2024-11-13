import React from 'react';
import { Providers } from './providers';

interface Props {
	children: React.ReactNode;
}

export const App = ({ children }: Props) => {
	return <Providers>{children}</Providers>;
};
