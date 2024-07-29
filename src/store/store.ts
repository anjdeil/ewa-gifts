import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { wpAPI } from "@/store/wordpress/wpAPI";
import { wooCommerceApi } from "@/store/wooCommerce/wooCommerceApi";
import { customApi } from "@/store/custom/customApi";
import MenuCategoriesSlice from "./reducers/MenuCategoriesSlice";
import { contactForm7Api } from "./contactForm7/contactForm7Api";
import CartSlice from "./reducers/CartSlice";
import PopupSlice from "./reducers/PopupSlice";
import { saveCartSliceToLocalStorageMiddleware } from "./reducers/CartSlice";
import { jwtApi } from "./jwt/jwtApi";
import CurrentOrder from "./reducers/CurrentOrder";
import SwiperModal from "@/store/reducers/SwiperModal";

const rootReducer = combineReducers({
    [wpAPI.reducerPath]: wpAPI.reducer,
    [contactForm7Api.reducerPath]: contactForm7Api.reducer,
    [wooCommerceApi.reducerPath]: wooCommerceApi.reducer,
    [customApi.reducerPath]: customApi.reducer,
    [jwtApi.reducerPath]: jwtApi.reducer,
    MenuCategoriesSlice: MenuCategoriesSlice.reducer,
    Cart: CartSlice,
    Popup: PopupSlice,
    currentOrder: CurrentOrder,
    swiperModal: SwiperModal
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(wpAPI.middleware)
                .concat(contactForm7Api.middleware)
                .concat(wooCommerceApi.middleware)
                .concat(customApi.middleware)
                .concat(jwtApi.middleware)
                .concat(saveCartSliceToLocalStorageMiddleware)
    })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
