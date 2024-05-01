import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    links: [],
    isLoading: false,
    error: ''
}

export const MenuSlice = createSlice({
    name: 'menuSlise',
    initialState,
    reducers: {
        menuFetching(state)
        {
            state.isLoading = true;
        },
        menuFetchingSuccess(state, action)
        {
            state.isLoading = false;
            state.links = action.payload;
            state.error = '';
        },
        menuFetchingError(state, action)
        {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})
export default MenuSlice.reducer;