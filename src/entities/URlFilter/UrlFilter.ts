type UrlFilterValue = string | number;

/**
 * Что умеет UrlFilter?
 *
 * 1. Устанавливать активное состояние фильтра
 * 2. Проверять валидность фильтра, который пытаются установить
 * 3. Умеет формировать то, как фильтр будет выглядет в url
 * 4. Умеет сбрасывать свое состояние
 * 5. Умеет парсить себя из url вида в обычный js
 *
 * 6. Но ничего не знает о том где он храниться и как туда попадать (стейты, сторы, страницы и тд)
 */
export class UrlFilter {
	name;
	availableValues;
	currentValue;
	urlValue = '';
	separator;

	constructor(
		name: string,
		availableValues: UrlFilterValue[],
		defaultValue: UrlFilterValue[] = [],
		separator = '.'
	) {
		this.name = name;
		this.availableValues = Array.isArray(defaultValue)
			? [...defaultValue, ...availableValues]
			: availableValues;
		this.currentValue = defaultValue;
		this.separator = separator;
		this.setUrlValue();
	}

	setValue(value: UrlFilterValue | UrlFilterValue[]) {
		if (Array.isArray(value)) {
			const validatedValues = value.filter(
				v => this.availableValues.includes(v) && !this.currentValue.includes(v)
			);
			this.currentValue.push(...validatedValues);
		} else {
			if (!this.availableValues.includes(value)) {
				throw new Error(`Невалидное значение для фильтра ${this.name}`);
			}

			if (this.currentValue.includes(value)) {
				this.currentValue = this.currentValue.filter(item => item !== value);
			} else {
				this.currentValue.push(value);
			}
		}
		this.setUrlValue();
	}

	setValueFromUrl(value: string) {
		if (typeof value !== 'string') {
			return this.setValue([]);
		}

		const parsedValue = value.split(this.separator);
		this.setValue(parsedValue);
	}

	resetValue() {
		this.currentValue = [];
		this.setUrlValue();
	}

	setUrlValue() {
		if (this.hasValue()) {
			this.urlValue = `${this.name}=${this.currentValue.join(this.separator)}`;
		} else {
			this.urlValue = '';
		}
	}

	hasValue() {
		return this.currentValue.length > 0;
	}

	isValueChecked(value: UrlFilterValue): boolean {
		return this.currentValue.includes(value);
	}
}
