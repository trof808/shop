import { host } from '@/shared/constants';
import axios from 'axios';

// TODO: сейчас в get парамеметры передаются через объект, а в create через переменные
export abstract class ApiService {
	public async get<ResponseType>({
		path = '',
		params = {},
		headers = {},
	}: {
		path?: string;
		params?: Record<string, any>;
		headers?: Record<string, any>;
	} = {}): Promise<ResponseType> {
		return await axios({
			method: 'GET',
			url: `${host}${path}`,
			params,
			headers,
		}).then(response => response.data);
	}

	public async create<ResponseType>({
		path = '',
		body = {},
		headers = {},
	}: {
		path?: string;
		body?: Record<string, any>;
		headers?: Record<string, any>;
	} = {}): Promise<ResponseType> {
		return await axios({
			method: 'POST',
			data: body,
			url: `${host}${path}`,
			headers,
		}).then(response => response.data);
	}

	public async update<ResponseType, PayloadType>(
		path: string = '',
		payload: PayloadType
	): Promise<ResponseType> {
		const bodyParams = JSON.stringify(payload);
		return await axios({
			method: 'PUT',
			url: `${host}${path}`,
			data: bodyParams,
		});
	}

	public async delete<ResponseType>({
		path = '',
		headers = {},
	}: {
		path?: string;
		headers?: Record<string, any>;
	} = {}): Promise<ResponseType> {
		return await axios({
			method: 'DELETE',
			url: `${host}${path}`,
			headers,
		}).then(response => response.data);
	}
}
