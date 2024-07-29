import axios from "axios";
import { IUser } from "@/modules/IUser";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) =>
    {
        try
        {
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
            return response.data;
        } catch (error)
        {
            return thunkAPI.rejectWithValue("Can't get the users :(")
        }
    }
);