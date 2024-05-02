import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { MenuSlice } from "./reducers/MenuReducer";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import productListSlice from "./reducers/productListSlice";

const rootReducer = combineReducers({
    [MenuSlice.name]: MenuSlice.reducer,
    productList: productListSlice
});

const combinedReducer = (state, action) =>
{
    if (action.type === HYDRATE)
    {
        console.log("WORKS!")
        return {
            ...state,
            ...action.payload,
        };
    }
    return rootReducer(state, action);
};


const combinedReducer = (state, action) =>
{
    if (action.type === HYDRATE)
    {
        console.log("WORKS!")
        return {
            ...state,
            ...action.payload,
        };
    }
    return rootReducer(state, action);
};

export const setupStore = () =>
{
    return configureStore({
        reducer: combinedReducer,
    })
}

export const wrapper = createWrapper(setupStore, { debug: true });


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
