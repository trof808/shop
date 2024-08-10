import { UrlFilter } from './UrlFilter';

describe('UrlFilter', () => {
	let filter: UrlFilter;

	describe('setValueFromUrl method', () => {
		beforeEach(() => {
			filter = new UrlFilter(
				'testFilter',
				['value1', 'value2', 'value3'],
				['value0'],
				'_'
			);
		});

		test('should save correct values', () => {
			filter.setValueFromUrl('value0_value1_value2_value3');

			expect(filter.currentValue).toEqual([
				'value0',
				'value1',
				'value2',
				'value3',
			]);
		});

		test('should discard incorrect values', () => {
			filter.setValueFromUrl('value0_value1_value2.value3');

			expect(filter.currentValue).toEqual(['value0', 'value1']);
		});

		test('should return empty array if not a string', () => {
			// @ts-ignore
			filter.setValueFromUrl(123);
			expect(filter.currentValue).toEqual(['value0']);

			// @ts-ignore
			filter.setValueFromUrl([]);
			expect(filter.currentValue).toEqual(['value0']);

			// @ts-ignore
			filter.setValueFromUrl(undefined);
			expect(filter.currentValue).toEqual(['value0']);
		});
	});

	describe('resetValue method', () => {
		beforeEach(() => {
			filter = new UrlFilter(
				'testFilter',
				['value1', 'value2', 'value3'],
				['value0'],
				'_'
			);
		});

		test('should reset values and url value', () => {
			expect(filter.currentValue).toEqual(['value0']);
			expect(filter.urlValue).toEqual('testFilter=value0');

			filter.resetValue();

			expect(filter.currentValue).toEqual([]);
			expect(filter.urlValue).toEqual('');

			expect(filter.name).toEqual('testFilter');
			expect(filter.availableValues).toEqual([
				'value0',
				'value1',
				'value2',
				'value3',
			]);
			expect(filter.separator).toEqual('_');
		});
	});

	describe('setUrlValue method', () => {
		beforeEach(() => {
			filter = new UrlFilter(
				'testFilter',
				['value1', 'value2', 'value3'],
				['value0'],
				'_'
			);
		});

		test('should set url value correctly', () => {
			filter.setUrlValue();

			expect(filter.urlValue).toEqual('testFilter=value0');
		});
	});

	describe('hasValue method', () => {
		beforeEach(() => {
			filter = new UrlFilter(
				'testFilter',
				['value1', 'value2', 'value3'],
				['value0'],
				'_'
			);
		});

		test('should return true with value', () => {
			expect(filter.hasValue()).toBeTruthy();
		});

		test('should return true without value', () => {
			filter = new UrlFilter(
				'testFilter',
				['value1', 'value2', 'value3'],
				[],
				'_'
			);

			expect(filter.hasValue()).toBeFalsy();
		});
	});

	describe('isValueChecked method', () => {
		beforeEach(() => {
			filter = new UrlFilter(
				'testFilter',
				['value1', 'value2', 'value3'],
				['value0'],
				'_'
			);
		});

		test('should return true when value in currentValue', () => {
			expect(filter.isValueChecked('value0')).toBeTruthy();
		});

		test('should return false when value not in currentValue', () => {
			expect(filter.isValueChecked('unknownValue')).toBeFalsy();
		});
	});

	describe('should work correnctly', () => {
		beforeEach(() => {
			filter = new UrlFilter(
				'testFilter',
				['value1', 'value2', 'value3'],
				['value0'],
				'_'
			);
		});

		test('should set initial state correctly', () => {
			expect(filter.name).toEqual('testFilter');
			expect(filter.availableValues).toEqual([
				'value0',
				'value1',
				'value2',
				'value3',
			]);
			expect(filter.currentValue).toEqual(['value0']);
			expect(filter.urlValue).toEqual('testFilter=value0');
			expect(filter.separator).toEqual('_');
		});

		test('should set value correctly', () => {
			filter.setValue('value1');
			filter.setValue(['value2', 'value3']);

			expect(filter.currentValue).toEqual([
				'value0',
				'value1',
				'value2',
				'value3',
			]);
		});

		test('should unset value when value exists', () => {
			filter.setValue('value1');
			filter.setValue('value1');

			expect(filter.currentValue).toEqual(['value0']);
		});

		test('should throw error for invalid value', () => {
			expect(() => filter.setValue('invalidValue')).toThrowError(
				'Невалидное значение для фильтра testFilter'
			);
		});

		test('should set url correctly', () => {
			filter.setValue('value1');
			filter.setValue(['value2', 'value3']);

			expect(filter.urlValue).toEqual('testFilter=value0_value1_value2_value3');
		});

		test('should set empty url correctly', () => {
			filter.setValue('value0');

			expect(filter.urlValue).toEqual('');
		});
	});
});
