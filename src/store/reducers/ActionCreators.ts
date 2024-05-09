import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import wooCommerceRestApi from "@/services/wooCommerceRestApi";
import
{
    productsFetching,
    productsFetchingSuccess,
    productsFetchingError
} from "./productListSlice";


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