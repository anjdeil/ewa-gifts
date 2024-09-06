import { Middleware } from "@reduxjs/toolkit";
import { saveCartItemsToLocalStorage } from "./cartItemsFunctions";
import { saveShippingLinesToLocalStorage } from "./shippingLinesFunctions";
import { saveWishlistToLocalStorage } from "./wishlistFunctions";

const saveCartSliceToLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const { items, shippingLines, wishlist } = store.getState().Cart;
    saveCartItemsToLocalStorage(items);
    saveShippingLinesToLocalStorage(shippingLines);
    saveWishlistToLocalStorage(wishlist);
    return result;
};

export default saveCartSliceToLocalStorageMiddleware;