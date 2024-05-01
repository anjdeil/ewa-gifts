import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: false,
    error: ''
}

const ProductListSlice = createSlice({
    name: 'productListSlice',
    initialState,
    reducers: {
        productsFetching(state) {
            state.isLoading = true;
        },
        productsFetchingSuccess(state, action) {
            state.isLoading = false;
            state.products = action.payload;
            state.error = '';
        },
        productsFetchingError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
})

export default ProductListSlice;