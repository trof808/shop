import { path } from 'ramda';
import { checkNumberField } from '@/shared/mapping/validation/checkNumberField';
import { checkStringField } from '@/shared/mapping/validation/checkStringField';
import { APIProduct } from '../services/productsApiService.types';
import { ProductType } from '../types';

export const productMapping = (
	products: APIProduct['products']
): ProductType[] => {
	if (!Array.isArray(products)) {
		return [];
	}

	return products.map(i => {
		return {
			id: checkNumberField(path(['id'], i)),
			title: checkStringField(path(['title'], i)),
			description: checkStringField(path(['description'], i)),
			price: {
				amount: checkNumberField(path(['price', 'amount'], i)),
				currency: checkStringField(path(['price', 'currency'], i)),
			},
			categoryId: checkNumberField(path(['categoryId'], i)),
			availableCount: checkNumberField(path(['availableCount'], i)),
		};
	});
};
