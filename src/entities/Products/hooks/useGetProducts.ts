import { productsApiService } from '@/features/ProductsListFeature/services/productsApiService';
import { productMapping } from '@/features/ProductsListFeature/stores/mapping/productsMapping';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetProducts = () => {
	const limit = 100;

	const {
		data = [],
		status,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['productsFirstPage'],
		queryFn: ({ pageParam }) =>
			productsApiService.getProducts(pageParam, limit),
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			const hasMore = limit * lastPage.page < lastPage.total;

			return hasMore ? lastPage.page + 1 : null;
		},
		select: data => data.pages.flatMap(page => productMapping(page.products)),
	});

	return {
		productsList: data,
		status,
		fetchNextPage,
		hasNextPage,
	};
};
