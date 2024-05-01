import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WooRestApi from "@/services/WooRestApi";
import {
    productsFetching,
    productsFetchingSuccess,
    productsFetchingError
} from "@/store/reducers/productListSlice";

const TestToolkit = () => {
    const wooRestApi = new WooRestApi();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsFetching());
        wooRestApi.getProducts({ per_page: 24 })
            .then((data) => {
                dispatch(productsFetchingSuccess(data))
            })
            .catch((err) => {
                dispatch(productsFetchingError(err.message))
            })
    }, [])

    const { products, isLoading, error } = useSelector(state => state.productList);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error</p>
    }

    return (
        <>
            <h2>Products</h2>
            <ul>
                {
                    products.map(({ name, price }) => {
                        return (
                            <li>{name}, <b>${price}</b></li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default TestToolkit;