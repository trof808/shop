'use client';
import { useAuth } from '@/entities/Auth/hooks/useAuth';
import { AuthFormFeature } from '@/features/AuthFormFeature/AuthFormFeature';

export default function Login() {
	const { toAuthenticate } = useAuth();

	return (
		<AuthFormFeature
			title='Log in'
			onSubmitClick={toAuthenticate}
			submitBtnText='Log in'
		/>
	);
}
