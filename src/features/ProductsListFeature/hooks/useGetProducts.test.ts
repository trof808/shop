import { renderHook } from '@testing-library/react-hooks';
import { useGetProducts } from './useGetProducts';

beforeEach(() => {
	vi.mock('../stores/productsStore', () => ({
		productsStore: () => ({
			isLoading: false,
			products: [],
			getProductsAction: () => null,
		}),
	}));

	vi.mock('../stores/basketStore', () => ({
		basketStore: () => ({
			selectedProductsIds: {},
			selectedTotalPrice: 0,
			addToBasketAction: vi.fn(),
			removeFromBasketAction: vi.fn(),
		}),
	}));
});

describe('useGetProducts', () => {
	const mockGetProductsAction = vi.fn();

	test('should return initial state', () => {
		const { result } = renderHook(useGetProducts);

		expect(result.current.products).toEqual([]);
		// expect(result.current.isLoading).toEqual(false);
		// expect(result.current.totalPrice).toBe(0);
	});
});
