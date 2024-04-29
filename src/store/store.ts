import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TestSlice } from "./reducers/TestSlice";

export const rootReducer = combineReducers({
    TestSlice
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
