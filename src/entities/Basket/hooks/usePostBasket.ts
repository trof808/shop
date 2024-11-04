import { basketApiService } from '../services/basketApiService';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/entities/Auth/hooks/useAuth';
import { BodyCartProduct } from '../types';

export const usePostBasket = () => {
	const { token } = useAuth();

	const save = useMutation({
		mutationFn: (bodyCart: BodyCartProduct[]) => {
			const body = {
				items: bodyCart,
			};

			return basketApiService.postCart(body, token);
		},
	});

	const saveCart = (body: BodyCartProduct[]) => save.mutate(body);
	const isLoading = save.isPending;

	return {
		saveCart,
		isLoading,
	};
};
