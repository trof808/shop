export const checkNumberField = (field: unknown) => {
	if (typeof field === 'number') {
		return field;
	}

	return 0;
};
