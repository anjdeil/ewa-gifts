import { createSlice } from '@reduxjs/toolkit';
import { currentOrderReducerType } from '@/types';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const storedOrderId = cookies.get('orderId');
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
        },
    },
});

export const { setCurrentOrder } = currentOrderSlice.actions;
export default currentOrderSlice.reducer;
