import { Basket } from './Basket';
import { IBasket, IBasketProduct } from '../types';
import { ApiService } from '@/shared/api/apiService';

const BASKET_KEY = 'basket';

export class BasketManager {
	updateStore: (basket: IBasket) => void;
	basket: Basket;

	constructor(
		updateStore: (basket: IBasket) => void,
		defaultBasketState: IBasket,
		// apiService: ApiService,
	) {
		this.updateStore = updateStore;
		this.basket = new Basket(defaultBasketState);
	}

	syncData() {
		return Promise.all([
			this.handleUpdateStore,
			this.handleUpdateBrowserStorage,
		])
	}

	handleUpdateStore() {
		this.updateStore(this.basket.obj);
	}

	handleUpdateBrowserStorage() {
		// this.updateBrowserStorage(this.basket.obj);
	}

	restoreBasketFromLocalStorage(products: IBasketProduct[]) {
		// Восстановить корзину из localStorage
		// и актуализировать информацию о продуктах
		this.updateProductsDataInBasket(products);
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

	updateProductsDataInBasket(products: IBasketProduct[]) {
		const productsIdsInBasket = this.basket.getProductsIds;
		const filteredProductsByIds = products.filter(p =>
			productsIdsInBasket.includes(String(p.id))
		);
		this.basket.updateProducts(filteredProductsByIds);
	}
}
