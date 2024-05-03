import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productListSlice from "./reducers/productListSlice";
import { wpAPI } from "@/services/ActionCreators";

const rootReducer = combineReducers({
    productList: productListSlice,
    [wpAPI.reducerPath]: wpAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(wpAPI.middleware)
    })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
