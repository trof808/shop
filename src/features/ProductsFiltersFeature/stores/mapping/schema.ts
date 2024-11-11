import { JSONSchemaType } from 'ajv';
import { APIProductsFilters } from '../../services/productsFiltersApiService.types';

export const apiProductsFiltersSchema: JSONSchemaType<APIProductsFilters> = {
	type: 'object',
	properties: {
		id: { type: 'string' },
		title: { type: 'string' },
		type: { type: 'string', enum: ['range', 'list'] },
		properties: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: { type: 'integer' },
					title: { type: 'string' },
					type: { type: 'string', enum: ['checkbox', 'range'] },
				},
				required: ['id', 'title', 'type'],
			},
		},
	},
	required: ['properties'],
};
