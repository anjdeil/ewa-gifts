import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getItemsCount = (items) => {
    return items.reduce((accumulator, item) => {
        if (item.type === 'variable') return accumulator + item.options.length;
        return accumulator + 1;
    }, 0);
}

const saveCartToLocalStorage = (state) => {
    try {
        const cartJSON = JSON.stringify(state);
        localStorage.setItem('cart', cartJSON);
    } catch (e) {
        console.warn(e);
    }
}
const loadCartFromLocalStorage = () => {
    try {
        const cartJSON = localStorage.getItem('cart') || undefined;
        const cart = JSON.parse(cartJSON);
        return cart;
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

export const fetchCartRows = createAsyncThunk(
    'Cart/fetchCartRows',
    async (cartItems, thunkAPI) => {
        const productPromises = [];

        const productIds = [];

        cartItems.forEach(({ id, type, options }) => {
            productIds.push(id);

            if (type === 'variable') {
                const variationIds = [];
                options.forEach(({ id: variationId }) => {
                    variationIds.push(variationId);
                });
                productPromises.push(axios.get(`/api/woo/products/${id}/variations`, {
                    params: {
                        include: variationIds.join(',')
                    }
                }));
            }
        });

        productPromises.push(axios.get(`/api/woo/products`, {
            params: {
                include: productIds.join(',')
            }
        }));

        const response = await Promise.all(productPromises);

        const cartRows = response.reduce((prevData, currData) => {
            return [...prevData, currData.data];
        }, []);

        return cartRows;
    }
);

export const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        items: loadCartFromLocalStorage() || [],
        cartRows: [],
        totals: {
            total: 0
        },
        itemsCount: 0,
        isLoading: false,
        isError: false,
        error: "",
        miniCartOpen: false,
    },
    reducers: {
        addedToCart: (state, action) => {
            state.items = updateCartItems(state.items, action.payload);
            state.itemsCount = getItemsCount(state.items);
        },
        toggleMiniCart: (state) => {
            state.miniCartOpen = !state.miniCartOpen
        },
        refreshItemsCount: (state) => {
            state.itemsCount = getItemsCount(state.items);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartRows.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartRows.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartRows = action.payload;
            })
            .addCase(fetchCartRows.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.isError = true;
            })
    },
})

export const cartLocalStorageMiddleware = store => next => action => {
    const result = next(action);
    const { items } = store.getState().Cart;
    saveCartToLocalStorage(items);
    return result;
};

export const { addedToCart, toggleMiniCart, refreshItemsCount } = CartSlice.actions;
export default CartSlice.reducer;