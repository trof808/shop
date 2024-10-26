interface BrowserStorage {
	get(key: string): string | null;
	set(key: string, value: string): void;
	delete(key: string): void;
}

export class LocalStorage implements BrowserStorage {
	get(key: string): string | null {
		return localStorage.getItem(key);
	}

	set(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	delete(key: string): void {
		localStorage.removeItem(key);
	}
}

export class SessionStorage implements BrowserStorage {
	get(key: string): string | null {
		return sessionStorage.getItem(key);
	}

	set(key: string, value: string): void {
		sessionStorage.setItem(key, value);
	}

	delete(key: string): void {
		sessionStorage.removeItem(key);
	}
}

// export const localStorageInstance = new LocalStorage();