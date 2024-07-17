import type { AppProps } from 'next/app';

export const App = ({ Component, pageProps }: AppProps) => {
	console.log('123');
	return <Component {...pageProps} />;
};
