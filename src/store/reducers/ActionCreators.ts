import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
<<<<<<< HEAD
import wooCommerceRestApi from "@/services/WooRestApi";
import
    {
        productsFetching,
        productsFetchingSuccess,
        productsFetchingError
    } from "./productListSlice";
=======
import wooCommerceRestApi from "@/services/wooCommerceRestApi";
import {
    productsFetching,
    productsFetchingSuccess,
    productsFetchingError
} from "./productListSlice";
>>>>>>> 99479462cbb9d2094b6c8f10f6a4dddf0d9a9a3b


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

export const fetchProducts = () => (dispatch) =>
{
    dispatch(productsFetching());
    wooCommerceRestApi.get('products',
        {
            per_page: 24,
            category: 400
        }
    )
        .then((response) =>
        {
            dispatch(productsFetchingSuccess(response.data))
        })
        .catch((err) =>
        {
            dispatch(productsFetchingError(err.message))
        })
}