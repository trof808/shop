import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReactQueryProvider } from './ReactQueryProvider';
import { AuthProvider } from './AuthProvider';
import { DataProvider } from './DataProvider';
import { HeaderProvider } from './HeaderProvider';
import { Toaster } from '@/shared/components/ui/shadcn/toaster';
import { cookieStorageInstance } from '@/shared/entities/BrowserStorage/models/BrowserStorage';

interface Props {
	children: React.ReactNode;
}

export const Providers = ({ children }: Props) => (
	<Router>
		<ReactQueryProvider>
			<AuthProvider browserStorage={cookieStorageInstance}>
				<DataProvider>
					<HeaderProvider>
						{children}
						<Toaster />
					</HeaderProvider>
				</DataProvider>
			</AuthProvider>
		</ReactQueryProvider>
	</Router>
);
