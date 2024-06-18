import {createSlice} from "@reduxjs/toolkit";

export const PopupSlice = createSlice({
    name: 'Popup',
    initialState: '',
    reducers: {
        popupSet: (state, action) => {
            return action.payload;
        },
        popupClosed: (state) => {
            return "";
        }
    }
});

export const {popupSet, popupClosed} = PopupSlice.actions;
export default PopupSlice.reducer;