import { Product, ProductId } from "../Product/Product";

export class Basket {
    // Можно хранить соответствия с помощью Map
    // https://learn.javascript.ru/map-set

    // Второй вариант
    products: Product[] = [];
    productsCount: Record<ProductId, number> = {}

    constructor(productsCount: Record<ProductId, number> = {}) {
        this.productsCount = productsCount;
    }

    addItem(product: Product) {
        if (!(product.id in this.productsCount)) {
            this.products.push(product);
            this.productsCount[product.id] = 1;
        } else {
            this.productsCount[product.id] = this.productsCount[product.id] + 1;
        }
    }

    removeItem(product: Product) {}

    clear() {}

    updateProducts(products: Product[]) {
        this.products = products;
    }
    
    get getProductsIds() {
        return Object.keys(this.productsCount);
    }

    getProductById(id: ProductId) {
        return this.products.find(p => p.id === id);
    }

    get totalPrice() {
        return Object.entries(this.productsCount).reduce((totalPrice, [productId, count]) => {
            const product = this.getProductById(productId);
            if (product)
                return totalPrice + product?.price.amount * count;
            return 0;
        }, 0);
    }
}