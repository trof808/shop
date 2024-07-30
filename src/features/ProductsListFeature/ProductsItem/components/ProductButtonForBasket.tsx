import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'add' | 'remove';
}

export const ProductButtonForBasket: React.FC<ButtonProps> = ({
	variant,
	children,
	...props
}) => {
	const baseClasses =
		'flex justify-center items-center rounded-lg w-[20px] h-[20px] hover:opacity-70';
	const variantClasses =
		variant === 'add'
			? 'text-white bg-green-500'
			: 'text-green-500 border-[1px] border-green-500';

	return (
		<button className={`${baseClasses} ${variantClasses}`} {...props}>
			{children}
		</button>
	);
};
