import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { MenuSlice } from "./reducers/MenuReducer";

export const rootReducer = combineReducers({
    MenuSlice: MenuSlice.reducer,
});

export const setupStore = () =>
{
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];