import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/entities/Auth/hooks/useAuth';
import { basketApiService } from '../services/basketApiService';
import { basketMapping } from '../mapping/basketMapping';

export const useGetBasket = () => {
	const { token } = useAuth();

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['getBasket'],
		queryFn: () => basketApiService.getCart(token),
		enabled: false,
	});

	const getBasket = async () => {
		const result = await refetch();
		return basketMapping(result.data!);
	};

	return {
		getBasket,
		basketList: data,
		isLoading,
	};
};
