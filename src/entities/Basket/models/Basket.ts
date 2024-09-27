import { ProductId } from '@/shared/types/product';
import { IBasket, IBasketProduct } from '../types';

export class Basket {
	products: IBasketProduct[] = [];
	productsCount: Record<ProductId, number> = {};

	constructor(defaultBasketState: IBasket) {
		this.products = defaultBasketState.products;
		this.productsCount = defaultBasketState.productsCount;
	}

	addItem(product: IBasketProduct) {
		if (!this.canAdd(product.id)) return;

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

	canAdd = (id: ProductId): boolean => {
		const productCountInBasket = this.getProductCountById(id);
		const currentProduct = this.getProductById(id);
		if (!currentProduct && !productCountInBasket) return true;

		if (!currentProduct) throw new Error('Продукт не найден');

		const availableCount = currentProduct.availableCount;
		return productCountInBasket < availableCount;
	};

	canRemove = (id: ProductId): boolean => {
		const productCountInBasket = this.getProductCountById(id);
		return productCountInBasket > 0;
	};

	clearProducts() {
		this.products = [];
		this.productsCount = {};
	}

	updateProducts(products: IBasketProduct[]) {
		this.products = products;
	}

	updateProductsCount(productsCount: Record<ProductId, number>) {
		this.productsCount = productsCount;
	}

	getProductCountById = (id: ProductId) => {
		return this.productsCount[id] || 0;
	};

	get getProductsIds() {
		return Object.keys(this.productsCount);
	}

	get totalPrice() {
		return this.products.reduce(
			(result, product) =>
				result + product.price.amount * this.productsCount[product.id],
			0
		);
	}

	getProductById(id: ProductId) {
		return this.products.find(p => p.id === id);
	}

	get obj(): IBasket {
		return {
			products: this.products,
			productsCount: this.productsCount,
		};
	}
}
