import { path } from 'ramda';
import { checkNumberField } from '@/shared/mapping/validation/checkNumberField';
import { checkStringField } from '@/shared/mapping/validation/checkStringField';
import { APIBasket } from '../services/basketApiService.types';
import { IBasket } from '../types';

// Добавить валидацию api в рантайме, для определения ошибок
// Изучить доку и возможности, попробовать применить
// https://github.com/ajv-validator/ajv
// Валидация контракта, если на бэкенде что-то изменилось, а мы не знаем
export const basketMapping = (products: APIBasket): IBasket => {
	const productsItems = path(['items'], products);

	const productsMapping = () => {
		return productsItems.map(item => ({
			id: checkNumberField(path(['product', 'id'], item)),
			title: checkStringField(path(['product', 'title'], item)),
			description: checkStringField(path(['product', 'description'], item)),
			price: {
				amount: checkNumberField(path(['product', 'price'], item)),
				currency: checkStringField(path(['product', 'currency'], item)),
			},
			categoryId: checkNumberField(path(['product', 'categoryId'], item)),
			availableCount: checkNumberField(
				path(['product', 'availableCount'], item)
			),
		}));
	};

	const productsCountMapping = () => {
		return productsItems.reduce((acc: Record<number, number>, item) => {
			acc[item.product.id] = item.product.availableCount;
			return acc;
		}, {});
	};

	return {
		products: productsMapping(),
		productsCount: productsCountMapping(),
	};
};
