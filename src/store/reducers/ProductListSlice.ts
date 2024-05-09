import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: [],
        isLoading: false,
        error: ''
    },
    reducers: {
        productsFetching(state)
        {
            state.isLoading = true;
        },
        productsFetchingSuccess(state, action)
        {
            state.isLoading = false;
            state.products = action.payload;
            state.error = '';
        },
        productsFetchingError(state, action)
        {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
})

export const {
    productsFetching,
    productsFetchingSuccess,
    productsFetchingError
} = productListSlice.actions;

export default productListSlice.reducer;