import { useInfiniteQuery } from '@tanstack/react-query';
import { productMapping } from '../mapping/productsMapping';
import { productsApiService } from '../services/productsApiService';

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
