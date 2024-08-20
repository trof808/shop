import { PriceType } from "@/shared/types/price";

export type ProductId = string;

// Продукт ничего не знает про корзину и как он туда попадает
export class Product {
	id: ProductId;
	title: string;
	description: string;
	price: { amount: number; currency: string };
	// Можно выделить категорию в отдельный класс
	categoryId: string;
	availableCount: number;

	constructor({
		id,
		title,
		description,
		price,
		categoryId,
		availableCount,
	}: {
		id: ProductId,
		title: string,
		description: string,
		price: PriceType,
		categoryId: string,
		availableCount: number,
	}) {
		this.id = id
		this.title = title
		this.description = description
		this.price = price
		this.categoryId = categoryId
		this.availableCount = availableCount
	}

	// updatePriceSum() {
	// 	this.priceSum = this.selectedCount * this.product.price.amount;
	// }

	// incrementCount() {
	// 	if (this.isCanIncrement) {
	// 		this.selectedCount = this.selectedCount + 1;
	// 		this.updatePriceSum();
	// 	} else {
	// 		throw new Error(
	// 			`Продукт ${this.product.id} нельзя добавить в корзину, т.к. превышено доступное количество: ${this.product.availableCount}`
	// 		);
	// 	}
	// }

	// decrementCount() {
	// 	this.selectedCount = this.selectedCount - 1;
	// 	this.updatePriceSum();
	// }

	// setCount(count: number) {
	// 	this.selectedCount = count;
	// 	this.updatePriceSum();
	// }

	// get isCanIncrement() {
	// 	return this.selectedCount < this.product.availableCount;
	// }
}
