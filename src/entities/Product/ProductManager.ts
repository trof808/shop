import { Product } from './Product';

export class ProductManager {
	products: Product[];
	changeState;

	constructor(products: Product[], changeState: (products: Product[]) => void) {
		this.products = products;
		this.changeState = changeState;
		this.setFromLocalStorage();
	}

	setFromLocalStorage() {}

	setToLocalStorage() {}

	updateStore() {
		this.changeState(this.products);
	}

	addToBasket(product: Product) {
		product.incrementCount();
		this.updateStore();
	}

	removeFromBasket(product: Product) {
		product.decrementCount();
		this.updateStore();
	}

	get totalPriceInBasket() {
		return this.products.reduce((acc, curr) => {
			return (acc += curr.priceSum);
		}, 0);
	}
}
