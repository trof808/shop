import { JSONSchemaType } from 'ajv';
import { APIBasket } from '../services/basketApiService.types';

export const apiBasketSchema: JSONSchemaType<APIBasket> = {
	type: 'object',
	properties: {
		id: { type: 'integer' },
		user_id: { type: 'integer' },
		created_at: { type: 'string' },
		updated_at: { type: 'string' },
		items: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: { type: 'integer' },
					quantity: { type: 'integer' },
					created_at: { type: 'string' },
					updated_at: { type: 'string' },
					product: {
						type: 'object',
						properties: {
							id: { type: 'integer' },
							title: { type: 'string' },
							description: { type: 'string' },
							price: { type: 'number' },
							currency: { type: 'string' },
							availableCount: { type: 'integer' },
							category_id: { type: 'integer' },
							created_at: { type: 'string' },
							updated_at: { type: 'string' },
						},
						required: ['id', 'title', 'price', 'currency', 'availableCount'],
					},
				},
				required: ['quantity', 'product'],
			},
		},
	},
	required: ['items'],
};
