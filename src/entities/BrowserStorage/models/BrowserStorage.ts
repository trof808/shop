export class BrowserStorage {
	static getItemLocalStorage(key: string) {
		return localStorage.getItem(key);
	}

	static setItemLocalStorage(key: string, value: string) {
		return localStorage.setItem(key, value);
	}
}
