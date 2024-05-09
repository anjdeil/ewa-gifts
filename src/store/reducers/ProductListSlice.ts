import { createSlice } from "@reduxjs/toolkit";
import { fetchProductList } from "./ActionCreators";

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: [],
        isLoading: false,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductList.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchProductList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload;
                state.error = '';
            })
            .addCase(fetchProductList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
})


export default productListSlice.reducer;