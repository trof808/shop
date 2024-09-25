import { Basket } from './Basket';
import { IBasket, IBasketProduct } from '../types';

const BASKET_KEY = 'basket';

export class BasketManager {
	updateStore: (basket: IBasket) => void;
	basket: Basket;

	constructor(
		updateStore: (basket: IBasket) => void,
		defaultBasketState: IBasket,
	) {
		this.updateStore = updateStore;
		this.basket = new Basket(defaultBasketState);
	}

	handleUpdateStore() {
		this.updateStore(this.basket.obj);
	}

	handleAddItemToBasket(product: IBasketProduct) {
		this.basket.addItem(product);
		this.handleUpdateStore();
	}

	handleRemoveItemFromBasket(product: IBasketProduct) {
		this.basket.removeItem(product);
		this.handleUpdateStore();
	}

	handleClearBasket() {
		this.basket.clearProducts();
		this.handleUpdateStore();
	}
}
