'use client';

import { SettedProducts } from './types';

interface Props {
	product: SettedProducts;
	addToBasketAction: (id: number) => void;
	removeFromBasketAction: (id: number) => void;
}

// Тут при скроле много рендерингов
// Можно более детально декомпозировать ProductItem по компонентам (но это просто лишний раз рекомендация)
export const ProductsItem = ({
	product,
	addToBasketAction,
	removeFromBasketAction,
}: Props) => {
	return (
		<div className='w-64 bg-sky-100 p-6'>
			<div key={product.id}>
				<h2>{product.title}</h2>
				<p>{product.description}</p>
			</div>

			<div className='flex justify-between items-center'>
				<p>
					<b>${product.price.amount}</b>
				</p>

				<div className='flex gap-3 items-center'>
					{!!product.countInBasket && (
						<>
							<button
								className='flex justify-center items-center items-green-500 text-green-500 border-[1px] border-green-500 rounded-lg w-[20px] h-[20px] hover:opacity-70'
								onClick={() => removeFromBasketAction(product.id)}
							>
								-
							</button>
							<p className='text-[12px]'>{product.countInBasket}</p>
						</>
					)}

					<button
						className='flex justify-center items-center items-green-500 text-white bg-green-500 rounded-lg w-[20px] h-[20px] hover:opacity-70'
						onClick={() => addToBasketAction(product.id)}
					>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

ProductsItem.displayName = 'ProductsItem';
