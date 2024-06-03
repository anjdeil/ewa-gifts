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
const addCartItem = (prevCart, updatedItem) => {
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

const transformCartRows = (cartItems, response) => {

    const parentsResponse = response[response.length - 1];
    const variationsResponse = response.slice(0, response.length - 1);

    const parentsData = parentsResponse.data;
    const variationsData = variationsResponse.reduce((prevData, currData) => {
        return [...prevData, ...currData.data];
    }, []);


    const cartRows = [];
    parentsData.forEach(parentData => {
        const relevantCartItem = cartItems.find(({ id }) => id === parentData.id);

        if (parentData.type === 'variable') {

            variationsData.forEach(variationData => {
                if (variationData.parent_id === parentData.id) {
                    const name = `${parentData.name} — ${variationData.name.split(' (#')[0]}`;
                    const relevantCartItemVariation = relevantCartItem.options.find(({ id }) => id === variationData.id);
                    const quantity = relevantCartItemVariation.quantity;

                    cartRows.push({
                        name,
                        image: variationData.image,
                        price: variationData.price,
                        quantity
                    });
                }
            });
        } else {
            const image = parentData.images.length ? parentData.images[0] : null;

            cartRows.push({
                name: parentData.name,
                image,
                price: parentData.price,
                quantity: relevantCartItem.quantity
            });
        }
    });

    return cartRows;

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

        const cartRows = transformCartRows(cartItems, response);

        return cartRows;
    }
);

const calculateTotal = (cartRows) => cartRows.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

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
            state.items = addCartItem(state.items, action.payload);
            state.itemsCount = getItemsCount(state.items);
        },
        decreasedCartQuantity: (state) => {

        },
        updatedCartQuantity: (state, action) => {

        },
        deletedFromCart: (state, action) => {

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
                state.totals.total = calculateTotal(action.payload);
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