export const host =
	process.env.NODE_ENV === 'development'
		? `${process.env.REACT_APP_API_DEV_SERVER}`
		: `${process.env.REACT_APP_API_PROD_SERVER}`;
