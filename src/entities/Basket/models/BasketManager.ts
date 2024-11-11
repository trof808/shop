import { Basket } from './Basket';
import {
	BasketConstructorParams,
	BodyCartProduct,
	IBasket,
	IBasketProduct,
} from '../types';
import { ProductId } from '@/entities/Products/types';
import { BrowserStorage } from '@/shared/entities/BrowserStorage/types';
import { BASKET_KEY } from './constants';

export class BasketManager {
	isAuthorized: boolean;
	basket: Basket;
	updateStore: (basket: IBasket) => void;
	notify: (message: string) => void;
	browserStorage: BrowserStorage;
	getBasketFromServer: () => Promise<IBasket>;
	updateServerStorage: (cartProducts: BodyCartProduct[]) => void;
	deleteServerStorage: () => void;

	constructor({
		isAuthorized,
		basket,
		updateStore,
		notify,
		browserStorage,
		getBasketFromServer,
		updateServerStorage,
		deleteServerStorage,
	}: BasketConstructorParams) {
		this.isAuthorized = isAuthorized;
		this.basket = basket;
		this.updateStore = updateStore;
		this.notify = notify;
		this.browserStorage = browserStorage;
		this.getBasketFromServer = getBasketFromServer;
		this.updateServerStorage = updateServerStorage;
		this.deleteServerStorage = deleteServerStorage;
	}

	syncData() {
		this.handleUpdateStore();

		if (this.isAuthorized) {
			return this.handleUpdateServerStorage(this.basket.productsCount);
		}

		return this.handleUpdateBrowserStorage();
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
		this.browserStorage.set(BASKET_KEY, JSON.stringify(this.basket));
	}

	handleUpdateServerStorage(products: Basket['productsCount']) {
		const productForServer = Object.entries(products).map(
			([productId, quantity]) => ({
				productId: Number(productId),
				quantity: Number(quantity),
			})
		);

		this.updateServerStorage(productForServer);
	}

	updateProductsPrices(products: IBasketProduct[]) {
		const productsInBasketWithActualPrice = this.basket.products.map(
			product => {
				const productInBasket = products.find(p => p.id === product.id);

				if (
					productInBasket &&
					productInBasket.price.amount !== product.price.amount
				) {
					product.price.amount = productInBasket.price.amount;
					this.notify('Prices could have changed');
				}

				return product;
			}
		);

		this.updateBasket(
			productsInBasketWithActualPrice,
			this.basket.productsCount
		);

		if (!this.isAuthorized) {
			this.handleUpdateBrowserStorage();
		}
	}

	restoreBasketFromLocalStorage() {
		const basketFromLocalStorage = this.browserStorage.get(BASKET_KEY);

		if (basketFromLocalStorage) {
			const basketFromLocalStorageObj = JSON.parse(basketFromLocalStorage);

			this.updateBasket(
				basketFromLocalStorageObj.products,
				basketFromLocalStorageObj.productsCount
			);
		}
	}

	async restoreBasketFromServer() {
		const basketFromServer = await this.getBasketFromServer();

		if (basketFromServer.products.length) {
			this.updateBasket(
				basketFromServer.products,
				basketFromServer.productsCount
			);
		} else {
			const basketFromLocalStorage = this.browserStorage.get(BASKET_KEY);

			if (basketFromLocalStorage) {
				const basketFromLocalStorageObj = JSON.parse(basketFromLocalStorage);
				this.handleUpdateServerStorage(basketFromLocalStorageObj.productsCount);
				this.restoreBasketFromLocalStorage();
			}
		}

		this.browserStorage.delete(BASKET_KEY);
	}

	restoreBasket() {
		if (this.isAuthorized) {
			return this.restoreBasketFromServer();
		}

		return this.restoreBasketFromLocalStorage();
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
		this.handleUpdateStore();

		if (this.isAuthorized) {
			this.deleteServerStorage();
		}

		this.browserStorage.delete(BASKET_KEY);
	}
}
