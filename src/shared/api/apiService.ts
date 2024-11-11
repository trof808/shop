import { BrowserStorage } from './../entities/BrowserStorage/types';
import { cookieTokenName, host } from '@/shared/constants';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiServiceConstructorParams } from './types';

export abstract class ApiService {
	browserStorage: BrowserStorage;

	constructor({ browserStorage }: ApiServiceConstructorParams) {
		this.browserStorage = browserStorage;
	}

	public async get<ResponseType>({
		path = '',
		params = {},
		headers,
	}: {
		path: string;
		params?: Record<string, any>;
		headers?: AxiosRequestConfig['headers'];
	}): Promise<ResponseType> {
		const token = this.browserStorage.get(cookieTokenName);

		const headerWithAuth = {
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...headers,
		};

		return await axios({
			method: 'GET',
			url: `${host}${path}`,
			params,
			headers: headerWithAuth,
		}).then(response => response.data);
	}

	public async create<ResponseType, PayloadType = {}>({
		path = '',
		body,
		headers,
	}: {
		path: string;
		body: PayloadType;
		headers?: AxiosRequestConfig['headers'];
	}): Promise<ResponseType> {
		const token = this.browserStorage.get(cookieTokenName);

		const headerWithAuth = {
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...headers,
		};

		return await axios({
			method: 'POST',
			data: body,
			url: `${host}${path}`,
			headers: headerWithAuth,
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
		headers,
	}: {
		path: string;
		headers?: AxiosRequestConfig['headers'];
	}): Promise<ResponseType> {
		const token = this.browserStorage.get(cookieTokenName);

		const headerWithAuth = {
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...headers,
		};

		return await axios({
			method: 'DELETE',
			url: `${host}${path}`,
			headers: headerWithAuth,
		}).then(response => response.data);
	}
}
