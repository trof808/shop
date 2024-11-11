export const host =
	process.env.NODE_ENV === 'development'
		? `${process.env.NEXT_PUBLIC_API_DEV_SERVER}`
		: `${process.env.NEXT_PUBLIC_API_PROD_SERVER}`;

export const PagesRoutes = {
	HOME: '/',
	FILTERS: '/filters',
	BASKET: '/basket',
	LOGIN: '/login',
	REGISTER: '/register',
};

export const cookieExpirationTime = 1 / 48;
export const cookieTokenName = 'token';
