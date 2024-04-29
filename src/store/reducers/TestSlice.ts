import { IUser } from "@/modules/IUser";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TestState {
    user: IUser[];
    isLoading: boolean;
    error: string;
}

export const initialState: TestState = {
    user: [],
    isLoading: false,
    error: '',
}

export const TestSlice = createSlice({
    name: 'test',
    initialState, 
    reducers: {
        fetchUSer(state) {
            state.isLoading = true;
        },
        editName(state, action: PayloadAction<IUser[]>) {
            state.isLoading = false;
            state.user = action.payload;
        }
    }
})

export default TestSlice;

// export const UserSlice = createSlice ({
//     name: 'user',
//     initialState,
//     reducers: {
//         usersFetching(state) {
//             state.isLoading = true;
//         },

//         usersFetchingSuccess(state, action: PayloadAction<IUser>) {
//             state.isLoading = false;
//             state.error = '';
//             state.users = action.payload;
//         },

//         usersFetchingError(state, action: PayloadAction<string>) {
//             state.isLoading = false;
//             state.error = action.payload;
//         }
//     }
// })