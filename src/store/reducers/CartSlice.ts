import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: 'Cart',
    initialState: [],
    reducers: {
        addedToCart: (prevCart, action) => {
            const { id: productId, type: productType, choosenOptions } = action.payload;

            const foundedItem = prevCart.find(({ id }) => id === productId);

            if (foundedItem) {
                return prevCart.map(cartItem => {
                    if (cartItem.id !== productId) return cartItem;

                    if (productType === 'variable') {
                        const foundedOptionIndex = cartItem.options.findIndex(option =>
                            Object.entries(option.attributes).every(([slug, value]) =>
                                choosenOptions[slug] === value
                            )
                        );

                        if (foundedOptionIndex !== -1) {
                            return {
                                ...cartItem,
                                options: cartItem.options.map((option, index) =>
                                    index === foundedOptionIndex
                                        ? { ...option, quantity: option.quantity + 1 }
                                        : option
                                )
                            };
                        } else {
                            return {
                                ...cartItem,
                                options: [
                                    ...cartItem.options,
                                    { attributes: { ...choosenOptions }, quantity: 1 }
                                ]
                            };
                        }
                    } else {
                        return { ...cartItem, quantity: cartItem.quantity + 1 };
                    }
                });
            } else {
                const newItem = {
                    id: productId,
                    type: productType,
                    options: productType === 'variable' ? [{ attributes: { ...choosenOptions }, quantity: 1 }] : [],
                    quantity: productType === 'variable' ? 0 : 1
                };
                return [...prevCart, newItem];
            }

        }
    }
})

export const { addedToCart } = CartSlice.actions;
export default CartSlice.reducer;