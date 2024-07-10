import { createSlice } from "@reduxjs/toolkit";

const swiperModal = createSlice({
    name: 'swiperModal',
    initialState: {
        data: [],
        currentSlide: '',
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setCurrentSlide: (state, action) => {
            state.currentSlide = action.payload;
        },
    },
})

export const { setData, setCurrentSlide } = swiperModal.actions;
export default swiperModal.reducer;