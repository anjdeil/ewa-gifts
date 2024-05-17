import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productListSlice from "./reducers/productListSlice";
import { wpAPI } from "@/store/actionCreators/wpAPI";
import { wooCommerceApi } from "@/services/wooCommerceApi";
import MenuCategoriesSlice from "./reducers/MenuCategoriesSlice";

const rootReducer = combineReducers({
    productList: productListSlice,
    [wpAPI.reducerPath]: wpAPI.reducer,
    [wooCommerceApi.reducerPath]: wooCommerceApi.reducer,
    MenuCategoriesSlice: MenuCategoriesSlice.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(wpAPI.middleware)
                .concat(wooCommerceApi.middleware)
    })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
