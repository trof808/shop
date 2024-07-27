export const checkNumberField = (field: unknown, isRequired = true) => {
	if (typeof field === 'number') {
		return field;
	}

	if (!isRequired) {
		return null;
	}

	return 0;
};
