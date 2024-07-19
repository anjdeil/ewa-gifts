import { CartItem } from "@/types/Cart";
import { Middleware, createSlice } from "@reduxjs/toolkit";

type CartStateType = {
    items: CartItem[],
    itemsCount: number,
    miniCartOpen: boolean
}

const saveCartItemsToLocalStorage = (cartItems: CartItem[]) => {
    if (typeof window !== 'undefined') {
        const cartItemsJSON = JSON.stringify(cartItems);
        localStorage.setItem('cartItems', cartItemsJSON);
    }
}

const getCartItemsFromLocalStorage = (): CartItem[] | undefined => {
    if (typeof window !== 'undefined') {
        const cartItemsJSON = localStorage.getItem('cartItems');

        if (!cartItemsJSON) return undefined;

        const cartItems = JSON.parse(cartItemsJSON);
        return cartItems;
    }

    return undefined;
}

export const saveCartItemsToLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const { items } = store.getState().Cart;
    saveCartItemsToLocalStorage(items);
    return result;
};

const cartInitialState: CartStateType = {
    items: getCartItemsFromLocalStorage() || [],
    itemsCount: 0,
    miniCartOpen: false,
};

export const CartSlice = createSlice({
    name: 'Cart',
    initialState: cartInitialState,
    reducers: {
        updateCart: (state, { payload }: { payload: { id: number, variationId?: number, quantity: number } }) => {
            const { id, quantity, variationId } = payload;
            if (quantity > 0) {

                const foundItem = state.items.find((item) =>
                    item.product_id === id && (!variationId || item.variation_id === variationId)
                );

                if (foundItem) foundItem.quantity = quantity;
                else state.items.push({
                    product_id: id,
                    quantity: quantity,
                    ...(variationId && { variation_id: variationId })
                });
            } else {
                state.items = state.items.filter((item) =>
                    item.product_id !== id || (variationId && item.variation_id !== variationId)
                );
            }

        },
        toggleMiniCart: (state) => {
            state.miniCartOpen = !state.miniCartOpen
        },
        refreshItemsCount: (state) => {
            state.itemsCount = state.items.length;
        }
    }
});

export const {
    updateCart,
    toggleMiniCart,
    refreshItemsCount
} = CartSlice.actions;

export default CartSlice.reducer;