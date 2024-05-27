import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const saveCartToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (e) {
        console.warn(e);
    }
}

const loadCartFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const updateCartItems = (prevCart, updatedItem) => {
    const { id: productId, type: productType, variationId, choosenOptions } = updatedItem;

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
                            { id: variationId, attributes: { ...choosenOptions }, quantity: 1 }
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
            options: productType === 'variable' ? [{ id: variationId, attributes: { ...choosenOptions }, quantity: 1 }] : [],
            quantity: productType === 'variable' ? 0 : 1
        };
        return [...prevCart, newItem];
    }
}

export const calculateCartTotal = createAsyncThunk(
    'Cart/calculateCartTotal',
    async (cartItems, thunkAPI) => {

        const productPromises = [];

        cartItems.forEach(({ id, type, options }) => {
            if (type === 'variable') {
                options.forEach(({ id: variationId }) => {
                    productPromises.push(axios.get(`api/woo/products/${id}/variations/${variationId}`));
                });
            } else {
                productPromises.push(axios.get(`api/woo/products/${id}`));
            }
        })

        const productResponses = await Promise.all(productPromises);

        // // Вычисление общей стоимости корзины
        // const total = productResponses.reduce(
        //     (sum, response) => sum + response.data.price,
        //     0
        // )
        console.log(productResponses);


        return productResponses;
    }
)

export const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        items: loadCartFromLocalStorage() || [],
        totals: {
            total: 0
        },
        isLoading: false,
        isError: false,
        error: "",
        miniCartOpen: false
    },
    reducers: {
        addedToCart: (state, action) => {
            state.items = updateCartItems(state.items, action.payload);
        },
        toggleMiniCart: (state) => {
            state.miniCartOpen = !state.miniCartOpen
        }
    }
})

export const cartLocalStorageMiddleware = store => next => action => {
    const result = next(action);
    saveCartToLocalStorage(store.getState().Cart.items);
    return result;
};

export const { addedToCart, toggleMiniCart } = CartSlice.actions;
export default CartSlice.reducer;