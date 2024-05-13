import { createSlice } from "@reduxjs/toolkit";

interface MenuCatState
{
    isOpen: boolean;
    isCategoryActive: number | null;
}

const initialState: MenuCatState = {
    isOpen: false,
    isCategoryActive: null,
}

export const MenuCategoriesSlice = createSlice({
    name: 'MenuCategories',
    initialState,
    reducers: {
        setCategory: (state, action) =>
        {
            state.isCategoryActive = action.payload;
        },
        setMenuOpen: (state, action) =>
        {
            state.isOpen = action.payload;
        }
    },
})

export default MenuCategoriesSlice;