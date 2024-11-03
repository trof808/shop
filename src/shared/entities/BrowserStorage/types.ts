export type CookieAttributes = Cookies.CookieAttributes;

export interface BrowserStorage {
	get(key: string): string | null;
	set(key: string, value: string): void;
	set(key: string, value: string, config: CookieAttributes): void;
	delete(key: string): void;
}
