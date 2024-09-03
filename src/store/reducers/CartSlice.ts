import { getCartItemsFromLocalStorage } from "@/Utils/CartSlice/cartItemsFunctions";
import { getShippingLinesFromLocalStorage } from "@/Utils/CartSlice/shippingLinesFunctions";
import { getWishlistFromLocalStorage } from "@/Utils/CartSlice/wishlistFunctions";
import { availableShippingLines } from "@/Utils/availableShippingLines";
import { WishlistItem } from "@/types";
import { CartItem } from "@/types/Cart";
import { createSlice } from "@reduxjs/toolkit";

export type ShippingLine = {
    method_id: string,
    method_title: string,
    total: string
};

type CartStateType = {
    items: CartItem[],
    wishlist: WishlistItem[],
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

const cartInitialState: CartStateType = {
    items: getCartItemsFromLocalStorage() || [],
    wishlist: getWishlistFromLocalStorage() || [],
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