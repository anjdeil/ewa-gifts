import { createSlice } from '@reduxjs/toolkit';
import { loadLocalStorageState } from '@/Utils/loadLocalStorageState';
import { currentOrderReducerType } from '@/types';

const storedOrderId = loadLocalStorageState('currentOrderId');
const initialOrderId = storedOrderId ? storedOrderId : null;

const initialState: currentOrderReducerType = {
    currentOrder: {
        orderId: initialOrderId,
    }
};

const currentOrderSlice = createSlice({
    name: 'currentOrder',
    initialState,
    reducers: {
        setCurrentOrder: (state, action) =>
        {
            state.currentOrder.orderId = action.payload;
            localStorage.setItem('currentOrderId', action.payload);

        },
    },
});

export const { setCurrentOrder } = currentOrderSlice.actions;
export default currentOrderSlice.reducer;
