import { host } from '@/shared/constants';
import axios from 'axios';

export abstract class ApiService {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = `${host}${baseUrl}`;
	}

	public async get<ResponseType>({
		path = '',
		params = {},
	}: {
		path?: string;
		params?: Record<string, any>;
	} = {}): Promise<ResponseType> {
		return await axios({
			method: 'GET',
			url: `${this.baseUrl}${path}`,
			params,
		});
	}

	public async create<ResponseType, PayloadType>(
		path: string = '',
		body: PayloadType
	): Promise<ResponseType> {
		return await axios({
			method: 'POST',
			data: body,
			url: `${this.baseUrl}${path}`,
		});
	}

	public async update<ResponseType, PayloadType>(
		path: string = '',
		payload: PayloadType
	): Promise<ResponseType> {
		const bodyParams = JSON.stringify(payload);
		return await axios({
			method: 'PUT',
			url: `${this.baseUrl}/${path}`,
			data: bodyParams,
		});
	}

	public async delete<ResponseType>(path: string = ''): Promise<ResponseType> {
		return (await axios({
			method: 'DELETE',
			url: `${this.baseUrl}/${path}`,
		})) as unknown as ResponseType;
	}
}
