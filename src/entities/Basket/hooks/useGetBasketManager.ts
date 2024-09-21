import { BasketManager } from "../models/BasketManager";
import { basketStore } from "../store/basketStore";

export const useGetBasketManager = () => {
    const basketState = basketStore().getBasketState()
    const updateBasketState = basketStore().updateBasketState;

    const basketManager = new BasketManager(updateBasketState, basketState);

    return {
        basketManager
    }
}