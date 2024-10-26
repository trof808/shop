import { Basket } from './Basket';
import { IBasket, IBasketProduct } from '../types';
import { ProductId } from '@/shared/types/product';

export class BasketManager {
	updateStore: (basket: IBasket) => void;
	// notify: ({ message }: { message: string }) => void;
	callToast: () => void;
	basket: Basket;
	updateBrowserStorage: (basket: Basket) => void;
	getBrowserStorage: () => string | null;

	constructor(
		updateStore: (basket: IBasket) => void,
		callToast: () => void,
		defaultBasketState: IBasket,
		updateBrowserStorage: (basket: Basket) => void,
		getBrowserStorage: () => string | null
	) {
		this.updateStore = updateStore;
		// notify
		this.callToast = callToast;
		this.basket = new Basket(defaultBasketState);
		this.updateBrowserStorage = updateBrowserStorage;
		this.getBrowserStorage = getBrowserStorage;
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
		this.updateBrowserStorage(this.basket);
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
					this.callToast();
				}

				return product;
			}
		);

		this.updateBasket(
			productsInBasketWithActualPrice,
			this.basket.productsCount
		);
		this.handleUpdateBrowserStorage();
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
