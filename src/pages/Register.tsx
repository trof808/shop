'use client';
import { useAuth } from '@/entities/Auth/hooks/useAuth';
import { AuthFormFeature } from '@/features/AuthFormFeature/AuthFormFeature';

export default function Register() {
	const { register } = useAuth();

	return (
		<AuthFormFeature
			title='Sign in'
			onSubmitClick={register}
			submitBtnText='Sign in'
		/>
	);
}
