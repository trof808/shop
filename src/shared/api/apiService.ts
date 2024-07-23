import { host } from '@/shared/constants';
import axios from 'axios';

export abstract class ApiService<T> {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = `${host}/${baseUrl}`;
	}

	public async get({
		path = '',
		params = {},
	}: {
		path?: string;
		params?: Record<string, any>;
	} = {}): Promise<T> {
		return await axios({
			method: 'GET',
			url: `${this.baseUrl}${path}`,
			params,
		});
	}

	public async create(
		path: string = '',
		body: Record<string, any>
	): Promise<T> {
		return await axios({
			method: 'POST',
			data: body,
			url: `${this.baseUrl}${path}`,
		});
	}

	public async update(
		path: string = '',
		payload: Record<string, any>
	): Promise<T> {
		const bodyParams = JSON.stringify(payload);
		return await axios({
			method: 'PUT',
			url: `${this.baseUrl}/${path}`,
			data: bodyParams,
		});
	}

	public async delete(path: string = ''): Promise<T> {
		return await axios<ResponseType>({
			method: 'DELETE',
			url: `${this.baseUrl}/${path}`,
		});
	}
}
