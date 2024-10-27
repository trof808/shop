import { useToast } from '@/shared/hooks/useToast';

export const useAuthToast = () => {
	const { toast } = useToast();

	const authenticationSuccessToast = () =>
		toast({
			title: 'Authentication',
			description: 'Welcome!',
			variant: 'success',
		});

	const authenticationErrorToast = () =>
		toast({
			title: 'Authentication',
			description: 'Something went wrong',
			variant: 'destructive',
		});

	const registrationErrorToast = () =>
		toast({
			title: 'Registration',
			description: 'Something went wrong',
			variant: 'destructive',
		});

	return {
		authenticationSuccessToast,
		authenticationErrorToast,
		registrationErrorToast,
	};
};
