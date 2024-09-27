import { Basket } from './Basket';
import { IBasket, IBasketProduct } from '../types';
import { BrowserStorage } from '@/entities/BrowserStorage/models/BrowserStorage';
import { ProductId } from '@/shared/types/product';

const BASKET_KEY = 'basket';

export class BasketManager {
	updateStore: (basket: IBasket) => void;
	basket: Basket;

	constructor(
		updateStore: (basket: IBasket) => void,
		defaultBasketState: IBasket
	) {
		this.updateStore = updateStore;
		this.basket = new Basket(defaultBasketState);
	}

	syncData() {
		this.handleUpdateStore();
		this.handleUpdateBrowserStorage();
	}

	handleUpdateStore() {
		this.updateStore(this.basket.obj);
	}

	updateBasket(
		products: IBasketProduct[],
		productsCount: Record<ProductId, number>
	) {
		this.basket.updateProducts(products);
		this.basket.updateProductsCount(productsCount);
		this.handleUpdateStore();
	}

	handleUpdateBrowserStorage() {
		BrowserStorage.setItemLocalStorage(BASKET_KEY, JSON.stringify(this.basket));
	}

	restoreBasketFromLocalStorage() {
		const basketFromLocalStorage =
			BrowserStorage.getItemLocalStorage(BASKET_KEY);

		if (basketFromLocalStorage) {
			const basketFromLocalStorageObj = JSON.parse(basketFromLocalStorage);

			this.updateBasket(
				basketFromLocalStorageObj.products,
				basketFromLocalStorageObj.productsCount
			);
		}
	}

	handleAddItemToBasket(product: IBasketProduct) {
		this.basket.addItem(product);
		this.syncData();
	}

	handleRemoveItemFromBasket(product: IBasketProduct) {
		this.basket.removeItem(product);
		this.syncData();
	}

	handleClearBasket() {
		this.basket.clearProducts();
		this.syncData();
	}
}
