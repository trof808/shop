import '../globals.css';
import { ButtonBackProvider } from './ButtonBackProvider';

export const metadata = {
	title: 'Shop',
	description: 'E-commerce project',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<ButtonBackProvider>{children}</ButtonBackProvider>
			</body>
		</html>
	);
}
