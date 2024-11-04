import { basketApiService } from '../services/basketApiService';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/entities/Auth/hooks/useAuth';

export const useDeleteBasket = () => {
	const { token } = useAuth();

	const clear = useMutation({
		mutationFn: () => basketApiService.deleteCart(token),
	});

	const clearCart = () => clear.mutate();
	const isLoading = clear.isPending;

	return {
		clearCart,
		isLoading,
	};
};
