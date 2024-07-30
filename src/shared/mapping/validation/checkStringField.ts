export const checkStringField = (field: unknown): string => {
	if (typeof field === 'string' && field.length) {
		return field;
	}

	return '';
};
