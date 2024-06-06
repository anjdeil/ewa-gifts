import { createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export const currentOrderReducerSchema = z.object({
    currentOrder: z.number().nullable()
});

export type currentOrderReducerType = z.infer<typeof currentOrderReducerSchema>;

const initialState: currentOrderReducerType = {
    currentOrder: null,
}

const currentOrderSlice = createSlice({
    name: 'currentOrder',
    initialState,
    reducers: {
        setCurrentOrder: (state, action) =>
        {
            state.currentOrder = action.payload;
        },
    },
});

export const { setCurrentOrder } = currentOrderSlice.actions;
export default currentOrderSlice.reducer;
