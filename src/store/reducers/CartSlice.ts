import { CartItem, CartSliceInitialStateType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getItemsCount = (items: CartItem[]) => {
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
    const { id: productId, type: productType, variationId, choosenOptions, imageUrl } = updatedItem;

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
                            { id: variationId, attributes: { ...choosenOptions }, quantity: 1, imageUrl }
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
            options: productType === 'variable' ? [{ id: variationId, attributes: { ...choosenOptions }, quantity: 1, imageUrl }] : [],
            quantity: productType === 'variable' ? 0 : 1,
            imageUrl: productType === 'variable' ? null : imageUrl
        };
        return [...prevCart, newItem];
    }
}

const updateCartItemQuantity = (prevCart: CartItem, targetItemData, quantity = 1, type = "update") => {
    const updateQuantity = (currentQuantity, type, quantity) => {
        switch (type) {
            case "update":
                return quantity;
            case "increase":
                return currentQuantity + quantity;
            case "decrease":
                return currentQuantity - quantity;
            default:
                return currentQuantity;
        }
    };

    for (let cartItemIndex = prevCart.length - 1; cartItemIndex >= 0; cartItemIndex--) {
        const cartItem = prevCart[cartItemIndex];

        if (targetItemData.type === 'variation') {
            if (cartItem.type !== 'variable') continue;

            const foundedOptionIndex = cartItem.options.findIndex(({ id }) => id === targetItemData.id);
            if (foundedOptionIndex === -1) continue;

            const targetQuantity = updateQuantity(cartItem.options[foundedOptionIndex].quantity, type, quantity);

            if (targetQuantity > 0) {
                cartItem.options[foundedOptionIndex].quantity = targetQuantity;
            } else {
                cartItem.options.splice(foundedOptionIndex, 1);
            }

            if (!cartItem.options.length) prevCart.splice(cartItemIndex, 1);


        } else if (cartItem.id === targetItemData.id) {
            const targetQuantity = updateQuantity(cartItem.quantity, type, quantity);

            if (targetQuantity > 0) {
                cartItem.quantity = targetQuantity;
            } else {
                prevCart.splice(cartItemIndex, 1);
            }
            break;
        }
    }
}

// To delete
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
                        id: variationData.id,
                        type: 'variation',
                        stockQuantity: variationData.stock_quantity,
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
                id: parentData.id,
                type: parentData.type,
                stockQuantity: parentData.stock_quantity,
                name: parentData.name,
                image,
                price: parentData.price,
                quantity: relevantCartItem.quantity
            });
        }
    });

    return cartRows;

}
// To delete
export const fetchCartRows = createAsyncThunk<CartItem[]>(
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
// To delete
const calculateTotal = (cartRows) => cartRows.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);



const initialState: CartSliceInitialStateType = {
    items: loadCartFromLocalStorage() || [],
    cartRows: [], // to delete
    totals: {// to delete
        total: 0// to delete
    },// to delete
    itemsCount: 0,
    isLoading: false,// to delete
    isError: false,// to detele
    error: "",// to delete
    miniCartOpen: false,
};

export const CartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addedToCart: (state, action) => {
            state.items = addCartItem(state.items, action.payload);
            state.itemsCount = getItemsCount(state.items);
        },
        increasedCartQuantity: (state, action) => {
            updateCartItemQuantity(state.items, action.payload, 1, 'increase');
            state.itemsCount = getItemsCount(state.items);
        },
        decreasedCartQuantity: (state, action) => {
            updateCartItemQuantity(state.items, action.payload, 1, 'decrease');
            state.itemsCount = getItemsCount(state.items);
        },
        updatedCartQuantity: (state, action) => {
            const { id, type, quantity } = action.payload;
            updateCartItemQuantity(state.items, { id, type }, quantity, 'update');
            state.itemsCount = getItemsCount(state.items);
        },
        deletedFromCart: (state, action) => {
            updateCartItemQuantity(state.items, action.payload, 0, 'update');
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
    extraReducers: (builder) => { // to delete
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

export const {
    addedToCart,
    increasedCartQuantity,
    decreasedCartQuantity,
    updatedCartQuantity,
    deletedFromCart,
    toggleMiniCart,
    refreshItemsCount } = CartSlice.actions;
export default CartSlice.reducer;