export class APIProcessableError extends Error {
	error: Error;

	constructor(error: Error, message: string) {
		super(message);
		this.error = error;
	}
}
