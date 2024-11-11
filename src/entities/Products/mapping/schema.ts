import { JSONSchemaType } from 'ajv';
import { APIProduct } from '../services/productsApiService.types';

export const apiProductSchema: JSONSchemaType<APIProduct['products']> = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			id: { type: 'integer' },
			title: { type: 'string' },
			description: { type: 'string' },
			categoryId: { type: 'integer' },
			availableCount: { type: 'integer' },
			price: {
				type: 'object',
				properties: {
					amount: { type: 'number' },
					currency: { type: 'string' },
				},
				required: ['amount', 'currency'],
			},
		},
		required: ['id', 'title', 'price'],
	},
};
