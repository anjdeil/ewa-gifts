import { CartItem } from "@/types/Cart"

export const compactCartItems = (cartItems: CartItem[]) => {
    return cartItems.map(
        ({ product_id, variation_id }) => ({
            product_id,
            ...(variation_id && { variation_id }),
        })
    )
}