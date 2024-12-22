export const host =
	import.meta.env.VITE_NODE_ENV === 'development'
		? `${import.meta.env.VITE_API_DEV_SERVER}`
		: `${import.meta.env.VITE_API_PROD_SERVER}`;

export const PagesRoutes = {
	HOME: '/',
	FILTERS: '/filters',
	BASKET: '/basket',
	LOGIN: '/login',
	REGISTER: '/register',
};

export const cookieExpirationTime = 1 / 48;
export const cookieTokenName = 'token';
