// @ts-ignore
const isDevelopment = typeof window !== 'undefined' ? window?.__ENV__?.NODE_ENV === 'development' : false;

// @ts-ignore
export const host = isDevelopment ? window?.__ENV__?.API_DEV_SERVER : '/';

export const PagesRoutes = {
	HOME: '/',
	FILTERS: '/filters',
	BASKET: '/basket',
	LOGIN: '/login',
	REGISTER: '/register',
};

export const cookieExpirationTime = 1 / 48;
export const cookieTokenName = 'token';
