import '../../../globals.css';
import { App } from '../App';

export const metadata = {
	title: 'Shop',
	description: 'E-commerce project',
};

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<App>{children}</App>
			</body>
		</html>
	);
}
