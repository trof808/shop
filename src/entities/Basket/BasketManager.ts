import { Basket } from './Basket';
import { IBasketProduct } from './types';

export class BasketManager {
	updateStore: (basket: Basket) => void;
	basket: Basket;

	constructor(updateStore: (basket: Basket) => void) {
		this.updateStore = updateStore;
		this.basket = new Basket();
	}

	handleUpdateBasketInStore() {
		this.updateStore(this.basket);
	}

	restoreBasketFromLocalStorage(products: IBasketProduct[]) {
		// Восстановить корзину из localStorage
		// и актуализировать информацию о продуктах
		this.updateProductsInBasket(products);
	}

	handleSaveBasketToLocalStorage() {}

	handleAddItemToBasket(product: IBasketProduct) {
		this.basket.addItem(product);
		this.handleUpdateBasketInStore();
	}

	handleRemoveItemFromBasket(product: IBasketProduct) {
		this.basket.removeItem(product);
		this.handleUpdateBasketInStore();
	}

	handleClearBasket() {
		this.basket.clearProducts();
		this.handleUpdateBasketInStore();
	}

	updateProductsInBasket(products: IBasketProduct[]) {
		const productsIdsInBasket = this.basket.getProductsIds;
		const filteredProductsByIds = products.filter(p =>
			productsIdsInBasket.includes(String(p.id))
		);
		this.basket.updateProducts(filteredProductsByIds);
	}
}
