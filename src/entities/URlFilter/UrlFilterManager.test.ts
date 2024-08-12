import { UrlFilter } from './UrlFilter';
import { UrlFilterManager } from './UrlFilterManager';

describe('UrlFilterManager', () => {
	let changeStateMock: (filters: UrlFilter[]) => void;
	let updateUrlMock: (url: string) => void;
	let filters: UrlFilter[];
	let urlFilterManager: UrlFilterManager;

	describe('should work correctly', () => {
		beforeEach(() => {
			changeStateMock = vi.fn();
			updateUrlMock = vi.fn();
			filters = [
				new UrlFilter('filter1', ['value1', 'value2'], ['value1']),
				new UrlFilter('filter2', ['value3', 'value4'], ['value3']),
			];
			urlFilterManager = new UrlFilterManager(
				changeStateMock,
				updateUrlMock,
				filters
			);
		});

		test('should set filter, update state and URL', () => {
			urlFilterManager.setFilter('filter1', 'value2');

			expect(filters[0].currentValue).toEqual(['value1', 'value2']);
			expect(urlFilterManager.changeState).toHaveBeenCalled();
			expect(changeStateMock).toHaveBeenCalledWith(filters);
			expect(urlFilterManager.updateUrl).toHaveBeenCalled();
			expect(updateUrlMock).toHaveBeenCalledWith(
				'?filter1=value1.value2&filter2=value3'
			);
		});

		test('should throw error if filter does not exist', () => {
			expect(() => {
				urlFilterManager.setFilter('nonExistentFilter', 'value1');
			}).toThrow('Нет такого фильтра');
		});

		test('should restore filter from URL', () => {
			const mockedUrl = '?filter1=value1.value2&filter2=value3';
			const mockSetValueFromUrl = vi.spyOn(filters[0], 'setValueFromUrl');
			const mockSetValueFromUrl2 = vi.spyOn(filters[1], 'setValueFromUrl');

			const mockLocation = {
				search: mockedUrl,
			};

			Object.defineProperty(window, 'location', {
				value: mockLocation,
				writable: true,
			});

			urlFilterManager.restoreFiltersFromUrl();

			expect(mockSetValueFromUrl).toHaveBeenCalledWith('value1.value2');
			expect(mockSetValueFromUrl2).toHaveBeenCalledWith('value3');
		});
	});

	describe('should work with unexpected values', () => {
		beforeEach(() => {
			changeStateMock = vi.fn();
			updateUrlMock = vi.fn();
			filters = [
				new UrlFilter('filter1', [1, 2], ['value1']),
				// @ts-ignore
				new UrlFilter(123, [3, 4], 5),
			];
			urlFilterManager = new UrlFilterManager(
				changeStateMock,
				updateUrlMock,
				filters
			);
		});

		test('should set filter, update state and URL', () => {
			urlFilterManager.setFilter('filter1', 2);

			expect(filters[0].currentValue).toEqual(['value1', 2]);
			expect(urlFilterManager.changeState).toHaveBeenCalled();
			expect(changeStateMock).toHaveBeenCalledWith(filters);
			expect(urlFilterManager.updateUrl).toHaveBeenCalled();
			expect(updateUrlMock).toHaveBeenCalledWith('?filter1=value1.2');
		});
	});
});
