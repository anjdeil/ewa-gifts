import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WooRestApi from "@/services/WooRestApi";
import { fetchProducts } from "@/store/reducers/ActionCreators";

const TestToolkit = () => {
    const wooRestApi = new WooRestApi();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts(wooRestApi));
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
                    products.map(({ id, name, price }) => {
                        return (
                            <li key={id}>{name}, <b>${price}</b></li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default TestToolkit;