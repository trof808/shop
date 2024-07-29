// Вынести это в /shared/api/validation/checkNumberField.ts
// Лучше избавляться от папок и файлов с названием utils. Они со временем превращаются в мусорку

export const checkNumberField = (field: unknown, isRequired = true) => {
	if (typeof field === 'number') {
		return field;
	}

	if (!isRequired) {
		return null;
	}

	return 0;
};
