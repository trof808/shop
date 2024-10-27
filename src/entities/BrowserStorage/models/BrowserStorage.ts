import Cookie from 'js-cookie';

// TODO: точно ли не лишнее это все? код не сокращается и не дополняется, нужна ли тогда обертка?
// не становится ли более запутанно?
interface BrowserStorage {
	get(key: string): string | null;
	set(key: string, value: string): void;
	delete(key: string): void;
}

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
		return Cookie.get(key) || null;
	}

	set(key: string, value: string, config?: { expires: number }): void {
		Cookie.set(key, value, config);
	}

	delete(key: string): void {
		Cookie.remove(key);
	}
}

export const localStorageInstance = new LocalStorage();
export const sesstionStorageInstance = new SessionStorage();
export const cookieStorageInstance = new CookieStorage();
