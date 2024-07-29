import { checkNumberField } from '@/shared/utils/checkNumberField';
import { checkStringField } from '@/shared/utils/checkStringField';
import { path } from 'ramda';
import { Product } from '../../types';

// Хорошее решение по обработке ответа API
export const productMapping = (products: Product[]) => {
	if (!Array.isArray(products)) {
		return [];
	}

	return products.map(i => {
		return {
			// в принципе ожидается, что id будет всегда
			id: checkNumberField(path(['id'], i)) as number, // Директиву as лучше избегать
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

// Тут мы обсудили, что правила валидации полей сильно зависят от контекста бизнесового и специфика работы бэкенда
// Паттерн который ты применил хорош, сами правила валидации, что делать возвращать ошибку или null это уже on depends