import { createSlice } from "@reduxjs/toolkit";

export const PopupSlice = createSlice({
    name: 'Popup',
    initialState: '',
    reducers: {
        popupSet: (_state, action) => {
            return action.payload;
        },
        popupClosed: () => {
            return "";
        },
        popupToggle: (state, action) => {
            return (action.payload !== state) ? action.payload : "";
        }
    }
});

export const { popupSet, popupClosed, popupToggle } = PopupSlice.actions;
export default PopupSlice.reducer;