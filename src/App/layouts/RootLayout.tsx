import '../../../globals.css';
import { App } from '../App';

export const metadata = {
	title: 'Shop',
	description: 'E-commerce project',
};

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className='bg-gradient-to-b from-sky-200 to-white min-h-screen'>
				<App>{children}</App>
			</body>
		</html>
	);
}
