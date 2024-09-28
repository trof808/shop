import React from 'react';
import { cn } from '@/shared/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'add' | 'remove';
}

export const ProductButtonForBasket: React.FC<ButtonProps> = ({
	variant,
	children,
	disabled,
	...props
}) => {
	const baseClasses =
		'flex justify-center items-center rounded-lg w-[20px] h-[20px] hover:opacity-70';
	const variantClasses =
		variant === 'add'
			? 'text-white bg-green-500'
			: 'text-green-500 border-[1px] border-green-500';

	const disabledClasses = disabled
		? 'bg-gray-400 cursor-default opacity-30 hover:opacity-30'
		: '';

	return (
		<button
			className={cn(baseClasses, variantClasses, disabledClasses)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};
