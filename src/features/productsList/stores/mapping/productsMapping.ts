import { checkNumberField } from '@/shared/utils/checkNumberField';
import { checkStringField } from '@/shared/utils/checkStringField';
import { path } from 'ramda';
import { Product } from '../../types';

export const productStoreMapping = (products: Product[]) => {
	if (!Array.isArray(products)) {
		return [];
	}

	return products.map(i => {
		return {
			id: checkNumberField(path(['id'], i)) as number,
			title: checkStringField(path(['title'], i)),
			description: checkStringField(path(['description'], i)),
			price: {
				amount: checkNumberField(path(['id'], i)) as number,
				currency: checkStringField(path(['price', 'currency'], i)),
			},
			categoryId: checkNumberField(path(['categoryId'], i)) as number,
		};
	});
};
