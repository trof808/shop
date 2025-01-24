import { useInfiniteQuery } from '@tanstack/react-query';
import { productMapping } from '../mapping/productsMapping';
import { productsApiService } from '../services/productsApiService';
import { ProductType } from '../types';

interface Props {
  ssrProducts: ProductType[];
}

export const useGetProducts = ({ ssrProducts }: Props) => {
  let ssrData = ssrProducts;
  const isHaveSsrData = ssrData.length;
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
    initialPageParam: isHaveSsrData ? 2 : 1,
    getNextPageParam: lastPage => {
      const hasMore = limit * lastPage.page < lastPage.total;

      return hasMore ? lastPage.page + 1 : null;
    },
    select: data => data.pages.flatMap(page => productMapping(page.products)),
    enabled: !isHaveSsrData,
  });

  if (isHaveSsrData) {
    const ssrObj = {
      productsList: [...ssrData],
      status: 'success',
      fetchNextPage,
      hasNextPage,
    };

    ssrData = [];

    return ssrObj;
  }

  return {
    productsList: data,
    status,
    fetchNextPage,
    hasNextPage,
  };
};
