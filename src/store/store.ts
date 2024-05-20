import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productListSlice from "./reducers/productListSlice";
import { wpAPI } from "@/store/wordpress/wpAPI";
import { wooCommerceApi } from "@/store/wooCommerce/wooCommerceApi";
import MenuCategoriesSlice from "./reducers/MenuCategoriesSlice";
import { contactForm7Api } from "./contactForm7/contactForm7Api";

const rootReducer = combineReducers({
    productList: productListSlice,
    [wpAPI.reducerPath]: wpAPI.reducer,
    [contactForm7Api.reducerPath]: contactForm7Api.reducer,
    [wooCommerceApi.reducerPath]: wooCommerceApi.reducer,
    MenuCategoriesSlice: MenuCategoriesSlice.reducer,
});

export const setupStore = () =>
{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(wpAPI.middleware)
                .concat(contactForm7Api.middleware)
                .concat(wooCommerceApi.middleware)
    })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
