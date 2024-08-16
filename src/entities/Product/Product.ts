import { ProductType } from '@/features/ProductsListFeature/types';

export class Product {
	product;
	selectedCount;
	priceSum;

	constructor(product: ProductType) {
		this.product = product;
		this.selectedCount = 0;
		this.priceSum = 0;
	}

	updatePriceSum() {
		this.priceSum = this.selectedCount * this.product.price.amount;
	}

	incrementCount() {
		if (this.isCanIncrement) {
			this.selectedCount = this.selectedCount + 1;
			this.updatePriceSum();
		} else {
			throw new Error(
				`Продукт ${this.product.id} нельзя добавить в корзину, т.к. превышено доступное количество: ${this.product.availableCount}`
			);
		}
	}

	decrementCount() {
		this.selectedCount = this.selectedCount - 1;
		this.updatePriceSum();
	}

	setCount(count: number) {
		this.selectedCount = count;
		this.updatePriceSum();
	}

	get isCanIncrement() {
		return this.selectedCount < this.product.availableCount;
	}
}
