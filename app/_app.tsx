import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
	alert('123334');
	return <Component {...pageProps} />;
}
