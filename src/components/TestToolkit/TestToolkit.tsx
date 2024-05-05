import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/reducers/ActionCreators";

const TestToolkit = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
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