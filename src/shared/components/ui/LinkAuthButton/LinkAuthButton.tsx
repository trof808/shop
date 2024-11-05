import Link from 'next/link';

interface Props {
	isAuthorized: boolean;
	logInRoute: string;
	registerRoute: string;
	handleLogOutClick: () => void;
}

export const LinkAuthButton = ({
	isAuthorized,
	logInRoute,
	registerRoute,
	handleLogOutClick,
}: Props) => {
	if (isAuthorized) {
		return (
			<div className='flex grow py-2 px-5 justify-end'>
				<button
					data-testid='logOut'
					className='rounded p-1 border-solid border-2 border-sky-300 bg-sky-300 text-white transition-opacity hover:opacity-80'
					onClick={handleLogOutClick}
				>
					Log out
				</button>
			</div>
		);
	}

	return (
		<div className='flex grow py-2 px-5 gap-4 justify-end'>
			<Link
				data-testid='logIn'
				className='rounded p-1 border-solid border-2 border-sky-300 transition duration-300 hover:bg-sky-300 hover:text-white'
				href={logInRoute}
			>
				Log in
			</Link>
			<Link
				data-testid='signIn'
				className='rounded p-1 border-solid border-2 border-sky-300 bg-sky-300 text-white transition-opacity hover:opacity-80'
				href={registerRoute}
			>
				Sign in
			</Link>
		</div>
	);
};
