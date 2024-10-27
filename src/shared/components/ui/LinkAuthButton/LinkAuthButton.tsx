import { cookieTokenName } from '@/entities/Auth/constants';
import { cookieStorageInstance } from '@/entities/BrowserStorage/models/BrowserStorage';
import { PagesRoutes } from '@/shared/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const LinkAuthButton = () => {
	const [token, setToken] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		setToken(cookieStorageInstance.get(cookieTokenName));
	}, []);

	const handleLogOut = () => {
		cookieStorageInstance.delete(cookieTokenName);
		router.push(PagesRoutes.LOGIN);
	};

	if (token) {
		return (
			<div className='flex grow py-2 px-5 justify-end'>
				<button
					className='rounded p-1 border-solid border-2 border-sky-300 bg-sky-300 text-white transition-opacity hover:opacity-80'
					onClick={handleLogOut}
				>
					Log out
				</button>
			</div>
		);
	}

	return (
		<div className='flex grow py-2 px-5 gap-4 justify-end'>
			<Link
				className='rounded p-1 border-solid border-2 border-sky-300 transition duration-300 hover:bg-sky-300 hover:text-white'
				href={PagesRoutes.LOGIN}
			>
				Log in
			</Link>
			<Link
				className='rounded p-1 border-solid border-2 border-sky-300 bg-sky-300 text-white transition-opacity hover:opacity-80'
				href={PagesRoutes.REGISTER}
			>
				Sign in
			</Link>
		</div>
	);
};
