import { createSlice } from '@reduxjs/toolkit';
import { loadLocalStorageState } from '@/Utils/loadLocalStorageState';
import { currentOrderReducerType } from '@/types';

const storedItems = loadLocalStorageState('currentOrderItems');
const storedOrderId = loadLocalStorageState('currentOrderId');
const initialOrderItems = storedItems ? storedItems : null;
const initialOrderId = storedOrderId ? storedOrderId : null;

const initialState: currentOrderReducerType = {
    currentOrder: {
        orderId: initialOrderId,
        productLineIds: initialOrderItems,
    }
};

const currentOrderSlice = createSlice({
    name: 'currentOrder',
    initialState,
    reducers: {
        setCurrentOrder: (state, action) =>
        {
            state.currentOrder.orderId = action.payload;
        },
        setLineItemsIds: (state, action) =>
        {
            state.currentOrder.productLineIds = action.payload;
        },
    },
});

export const { setCurrentOrder, setLineItemsIds } = currentOrderSlice.actions;
export default currentOrderSlice.reducer;
