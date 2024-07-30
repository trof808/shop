import { path } from 'ramda';
import { Product } from '../../types';
import { checkNumberField } from '@/shared/mapping/validation/checkNumberField';
import { checkStringField } from '@/shared/mapping/validation/checkStringField';

export const productMapping = (products: Product[]) => {
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
		};
	});
};
