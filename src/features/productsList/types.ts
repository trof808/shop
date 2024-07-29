// Хорошая практика примитивы делать обобщенными типами
// Тут скорее улучшается читаемость кода, что за id. Также тип id всегда может измениться
// https://refactoring.guru/ru/replace-data-value-with-object
type ProductId = number;

// Разделить разные интерфейсы для хранения на стороне приложения и то, что приходит из api.
export interface Product {
	id: number;
	title: string;
	description: string;
	price: { amount: number; currency: string };
	categoryId: number;
}

export interface SettedProducts extends Product {
	countInBasket: number;
}
