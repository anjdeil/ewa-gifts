import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { MenuSlice } from "./reducers/MenuReducer";
import { createWrapper } from "next-redux-wrapper";

export const rootReducer = combineReducers({
    MenuSlice: MenuSlice.reducer,
});

export const setupStore = () =>
{
    return configureStore({
        reducer: rootReducer,
    })
}

export const wrapper = createWrapper(setupStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];