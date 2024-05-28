import { IUser } from "@/modules/IUser";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./ActionCreators";

interface UserState
{
    users: IUser[];
    isLoading: boolean;
    error: string;
}

export const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
}

export const UserSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        usersFetchingSuccess(state, action: PayloadAction<IUser[]>)
        {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;
        },
    },
    //     extraReducers: (builder) =>
    //     {
    //         builder
    //             .addCase(fetchUsers.fulfilled.type, (state, action: PayloadAction<IUser[]>) =>
    //             {
    //                 state.isLoading = false;
    //                 state.error = '';
    //                 state.users = action.payload;
    //             })
    //             .addCase(fetchUsers.pending.type, (state) =>
    //             {
    //                 state.isLoading = true;
    //             })
    //             .addCase(fetchUsers.rejected.type, (state, action: PayloadAction<string>) =>
    //             {
    //                 state.isLoading = false;
    //                 state.error = action.payload;
    //             });
    //     },
    // });

    export default UserSlice.reducer;