import { path } from 'ramda';
import { checkNumberField } from '@/shared/mapping/validation/checkNumberField';
import { checkStringField } from '@/shared/mapping/validation/checkStringField';
import { APIBasket } from '../services/basketApiService.types';
import { IBasket } from '../types';
import Ajv from 'ajv';
import { apiBasketSchema } from './schema';

const ajv = new Ajv();
const validate = ajv.compile(apiBasketSchema);

export const basketMapping = (products: APIBasket): IBasket => {
	if (!validate(products)) {
		console.error(validate.errors);
	}

	const productsItems = path(['items'], products);

	const productsMapping = () => {
		if (!Array.isArray(productsItems)) {
			return [];
		}

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
		if (!Array.isArray(productsItems)) {
			return {};
		}

		return productsItems.reduce((acc: Record<number, number>, item) => {
			acc[item.product.id] = item.quantity;
			return acc;
		}, {});
	};

	return {
		products: productsMapping(),
		productsCount: productsCountMapping(),
	};
};
