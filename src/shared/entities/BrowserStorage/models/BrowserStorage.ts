import Cookies from 'js-cookie';
import { BrowserStorage, CookieAttributes } from '../types';

export class LocalStorage implements BrowserStorage {
	get(key: string) {
		return localStorage.getItem(key);
	}

	set(key: string, value: string) {
		localStorage.setItem(key, value);
	}

	delete(key: string) {
		localStorage.removeItem(key);
	}
}

export class SessionStorage implements BrowserStorage {
	get(key: string) {
		return sessionStorage.getItem(key);
	}

	set(key: string, value: string) {
		sessionStorage.setItem(key, value);
	}

	delete(key: string) {
		sessionStorage.removeItem(key);
	}
}

export class CookieStorage implements BrowserStorage {
	get(key: string) {
		return Cookies.get(key) || null;
	}

	set(key: string, value: string): void;
	set(key: string, value: string, config: CookieAttributes): void;
	set(key: string, value: string, config?: CookieAttributes): void {
		Cookies.set(key, value, config || {});
	}

	delete(key: string): void {
		Cookies.remove(key);
	}
}

export const localStorageInstance = new LocalStorage();
export const sessionStorageInstance = new SessionStorage();
export const cookieStorageInstance = new CookieStorage();
