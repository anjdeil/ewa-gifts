import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (state) =>
{
    try
    {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (e)
    {
        console.warn(e);
    }
}

const loadCartFromLocalStorage = () =>
{
    try
    {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e)
    {
        console.warn(e);
        return undefined;
    }
}

export const CartSlice = createSlice({
    name: 'Cart',
    initialState: loadCartFromLocalStorage() || [],
    reducers: {
        addedToCart: (prevCart, action) =>
        {
            const { id: productId, type: productType, variationId, choosenOptions } = action.payload;

            const foundedItem = prevCart.find(({ id }) => id === productId);

            if (foundedItem)
            {
                return prevCart.map(cartItem =>
                {
                    if (cartItem.id !== productId) return cartItem;

                    if (productType === 'variable')
                    {
                        const foundedOptionIndex = cartItem.options.findIndex(option =>
                            Object.entries(option.attributes).every(([slug, value]) =>
                                choosenOptions[slug] === value
                            )
                        );

                        if (foundedOptionIndex !== -1)
                        {
                            return {
                                ...cartItem,
                                options: cartItem.options.map((option, index) =>
                                    index === foundedOptionIndex
                                        ? { ...option, quantity: option.quantity + 1 }
                                        : option
                                )
                            };
                        } else
                        {
                            return {
                                ...cartItem,
                                options: [
                                    ...cartItem.options,
                                    { id: variationId, attributes: { ...choosenOptions }, quantity: 1 }
                                ]
                            };
                        }
                    } else
                    {
                        return { ...cartItem, quantity: cartItem.quantity + 1 };
                    }
                });
            } else
            {
                const newItem = {
                    id: productId,
                    type: productType,
                    options: productType === 'variable' ? [{ id: variationId, attributes: { ...choosenOptions }, quantity: 1 }] : [],
                    quantity: productType === 'variable' ? 0 : 1
                };
                return [...prevCart, newItem];
            }

        }
    }
})

export const cartLocalStorageMiddleware = store => next => action =>
{
    const result = next(action);
    saveCartToLocalStorage(store.getState().Cart);
    return result;
};

export const { addedToCart } = CartSlice.actions;
export default CartSlice.reducer;