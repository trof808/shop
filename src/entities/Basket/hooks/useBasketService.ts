import { useMutation, useQuery } from '@tanstack/react-query';
import { basketApiService } from '../services/basketApiService';
import { basketMapping } from '../mapping/basketMapping';
import { BodyCartProduct } from '../types';

export const useGetBasketService = () => {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['getBasket'],
		queryFn: () => basketApiService.getCart(),
		enabled: false,
	});

	const save = useMutation({
		mutationFn: (bodyCart: BodyCartProduct[]) => {
			const body = {
				items: bodyCart,
			};

			return basketApiService.postCart(body);
		},
	});

	const clear = useMutation({
		mutationFn: () => basketApiService.deleteCart(),
	});

	const getBasket = async () => {
		const result = await refetch();
		return basketMapping(result.data!);
	};
	const saveBasket = (body: BodyCartProduct[]) => save.mutate(body);
	const clearBasket = () => clear.mutate();

	return {
		getBasket,
		saveBasket,
		clearBasket,
		basketList: data,
		getBasketIsLoading: isLoading,
		saveBasketIsLoading: save.isPending,
		deleteBasketIsLoading: clear.isPending,
	};
};
