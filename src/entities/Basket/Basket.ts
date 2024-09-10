import { ProductId } from '@/shared/types/product';
import { IBasketProduct } from './types';

export class Basket {
	products: IBasketProduct[] = [];
	productsCount: Record<ProductId, number> = {};

	constructor() {}

	addItem(product: IBasketProduct) {
		if (!(product.id in this.productsCount)) {
			this.products.push(product);
			this.productsCount[product.id] = 1;
		} else {
			this.productsCount[product.id] = this.productsCount[product.id] + 1;
		}
	}

	removeItem(product: IBasketProduct) {
		if (this.productsCount[product.id] > 1) {
			this.productsCount[product.id] = this.productsCount[product.id] - 1;
		} else {
			this.products = this.products.filter(p => p.id !== product.id);
			delete this.productsCount[product.id];
		}
	}

	clearProducts() {
		this.products = [];
		this.productsCount = {};
	}

	updateProducts(products: IBasketProduct[]) {
		this.products = products;
	}

	get getProductsIds() {
		return Object.keys(this.productsCount);
	}

	getProductById(id: ProductId) {
		return this.products.find(p => p.id === id);
	}
}
