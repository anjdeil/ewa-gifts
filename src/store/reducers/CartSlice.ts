import { availableShippingLines } from "@/Utils/availableShippingLines";
import { CartItem } from "@/types/Cart";
import { Middleware, createSlice } from "@reduxjs/toolkit";

export type ShippingLine = {
    method_id: string,
    method_title: string,
    total: string
};

type CartStateType = {
    items: CartItem[],
    shippingLines: ShippingLine[],
    itemsCount: number
};

type UpdateCartPayloadType = {
    id: number,
    variationId?: number,
    quantity: number,
    supplier?: string,
    total?: string
};

const saveCartItemsToLocalStorage = (cartItems: CartItem[]) => {
    if (typeof window !== 'undefined') {
        const cartItemsJSON = JSON.stringify(cartItems);
        localStorage.setItem('cartItems', cartItemsJSON);
    }
}

const saveShippingLinesToLocalStorage = (shippingLines: ShippingLine[]) => {
    if (typeof window !== 'undefined') {
        const shippingLinesJSON = JSON.stringify(shippingLines);
        localStorage.setItem('shippingLines', shippingLinesJSON);
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

const getShippingLinesFromLocalStorage = (): ShippingLine[] | undefined => {
    if (typeof window !== 'undefined') {
        const shippingLinesJSON = localStorage.getItem('shippingLines');

        if (!shippingLinesJSON) return undefined;

        const shippingLines = JSON.parse(shippingLinesJSON);
        return shippingLines;
    }

    return undefined;
}

export const saveCartSliceToLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const { items, shippingLines } = store.getState().Cart;
    saveCartItemsToLocalStorage(items);
    saveShippingLinesToLocalStorage(shippingLines);
    return result;
};

const cartInitialState: CartStateType = {
    items: getCartItemsFromLocalStorage() || [],
    shippingLines: getShippingLinesFromLocalStorage() || [],
    itemsCount: 0,
};

export const CartSlice = createSlice({
    name: 'Cart',
    initialState: cartInitialState,
    reducers: {
        updateCart: (state, { payload }: { payload: UpdateCartPayloadType }) => {
            const { id, quantity, variationId, supplier, total } = payload;
            if (quantity > 0 && supplier && total) {

                const foundItem = state.items.find((item) =>
                    item.product_id === id && (!variationId || item.variation_id === variationId)
                );

                if (foundItem) {
                    foundItem.quantity = quantity;
                    if (total) foundItem.total = total;
                } else {
                    state.items.push({
                        product_id: id,
                        quantity: quantity,
                        supplier,
                        total,
                        ...(variationId && { variation_id: variationId }),
                    });
                }
            } else {
                state.items = state.items.filter((item) =>
                    item.product_id !== id || (variationId && item.variation_id !== variationId)
                );
            }

            state.shippingLines = availableShippingLines.filter(({ method_id }) => {
                return state.items.some(({ supplier }) => method_id === supplier);
            });
        },
        matchShippingLinesByCartItems: (state, { payload }: { payload: CartItem[] }) => {
            state.shippingLines = availableShippingLines.filter(({ method_id }) => {
                payload.some(({ supplier }) => method_id === supplier);
            });
        },
        refreshItemsCount: (state) => {
            state.itemsCount = state.items.length;
        }
    }
});

export const {
    updateCart,
    refreshItemsCount
} = CartSlice.actions;

export default CartSlice.reducer;