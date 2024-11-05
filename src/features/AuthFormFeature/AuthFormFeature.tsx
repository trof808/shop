import { Input } from '@/shared/components/ui/shadcn/input';
import { useState } from 'react';

interface Props {
	title: string;
	onSubmitClick: ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => void;
	submitBtnText: string;
}

export const AuthFormFeature = ({
	title,
	onSubmitClick,
	submitBtnText,
}: Props) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const isDisabled = !formData.email.length || !formData.password.length;

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;

		setFormData(prev => ({
			...prev,
			[id]: value,
		}));
	};

	return (
		<section className='grid place-content-center gap-2'>
			<h2 data-testid='authTitle'>{title}</h2>

			<Input
				type='email'
				id='email'
				placeholder='Email'
				data-testid='inputEmail'
				onChange={onInputChange}
			/>
			<Input
				type='password'
				id='password'
				placeholder='Password'
				data-testid='inputPassword'
				onChange={onInputChange}
			/>

			<button
				disabled={isDisabled}
				data-testid='buttonAuth'
				className='rounded p-1 bg-green-300 disabled:bg-gray-300'
				onClick={() => onSubmitClick(formData)}
			>
				{submitBtnText}
			</button>
		</section>
	);
};
