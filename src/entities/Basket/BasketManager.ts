import { Product } from "../Product/Product";
import { Basket } from "./Basket";

class BasketManager {
    basket: Basket;

    constructor(updateStore) {
        this.basket = new Basket();
    }

    handleUpdateBasketInStore() {

    }

    restoreBasetFromLocalStorage(products: Product[]) {
        // Восстановить корзину из localStorage
        // и актуализировать информацию о продуктах
        this.updateProductsInBasket(products);
    }

    handleSaveBasketToLocalStorage() {

    }

    handleAddItemToBasket(product: Product) {
        this.basket.addItem(product);
    }

    handleRemoveItemFromBasket(product: Product) {

    }

    handleClearBasket() {
        this.basket.clear();
    }

    updateProductsInBasket(products: Product[]) {
        const productsIdsInBasket = this.basket.getProductsIds;
        const filteredProductsByIds = products.filter(p => productsIdsInBasket.includes(p.id))
        this.basket.updateProducts(filteredProductsByIds);
    }
}