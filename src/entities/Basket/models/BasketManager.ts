import { Basket } from './Basket';
import {
	BasketConstructorParams,
	BodyCartProduct,
	IBasket,
	IBasketProduct,
} from '../types';
import { ProductId } from '@/entities/Products/types';

export class BasketManager {
	isAuthorized: boolean;
	updateStore: (basket: IBasket) => void;
	notify: (message: string) => void;
	basket: Basket;
	updateBrowserStorage: (basket: Basket) => void;
	getBrowserStorage: () => string | null;
	getBasketFromServer: () => Promise<IBasket>;
	deleteBrowserStorage: () => void;
	updateServerStorage: (cartProducts: BodyCartProduct[]) => void;
	deleteServerStorage: () => void;

	constructor(params: BasketConstructorParams) {
		const {
			isAuthorized,
			updateStore,
			notify,
			defaultBasketState,
			updateBrowserStorage,
			getBrowserStorage,
			getBasketFromServer,
			deleteBrowserStorage,
			updateServerStorage,
			deleteServerStorage,
		} = params;

		this.isAuthorized = isAuthorized;
		this.updateStore = updateStore;
		this.notify = notify;
		this.basket = new Basket(defaultBasketState);
		this.updateBrowserStorage = updateBrowserStorage;
		this.getBrowserStorage = getBrowserStorage;
		this.deleteBrowserStorage = deleteBrowserStorage;
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
		this.updateBrowserStorage(this.basket);
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
		const basketFromLocalStorage = this.getBrowserStorage();

		if (basketFromLocalStorage) {
			const basketFromLocalStorageObj = JSON.parse(basketFromLocalStorage);

			this.updateBasket(
				basketFromLocalStorageObj.products,
				basketFromLocalStorageObj.productsCount
			);
		}
	}

	async restoreBasketFromServer() {
		const basketList = await this.getBasketFromServer();

		if (basketList.products.length) {
			this.updateBasket(basketList.products, basketList.productsCount);
		} else {
			const basketFromLocalStorage = this.getBrowserStorage();

			if (basketFromLocalStorage) {
				const basketFromLocalStorageObj = JSON.parse(basketFromLocalStorage);
				this.handleUpdateServerStorage(basketFromLocalStorageObj.productsCount);
				this.restoreBasketFromLocalStorage();
			}
		}

		this.deleteBrowserStorage();
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

		return this.deleteBrowserStorage();
	}
}
