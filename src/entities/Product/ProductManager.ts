import { Product } from './Product';

export class ProductManager {
	products: Product[];
	changeState;

	constructor(products: Product[], changeState: (products: Product[]) => void) {
		this.products = products;
		this.changeState = changeState;
	}

	setFromLocalStorage() {
		if (typeof window !== 'undefined') {
			const productsFromStorage: Product[] = JSON.parse(
				localStorage.getItem('Basket') ?? '[]'
			);

			this.products = this.products.map(item => {
				const storedSameItem = productsFromStorage.find(
					value => value.product.id === item.product.id
				);

				if (storedSameItem) {
					item.setCount(storedSameItem.selectedCount);
				}

				return item;
			});
		}

		this.changeState(this.products);
	}

	setToLocalStorage() {
		localStorage.setItem('Basket', JSON.stringify(this.products));
	}

	updateStore() {
		this.changeState(this.products);
		this.setToLocalStorage();
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
