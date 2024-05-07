import React, { useEffect, useState } from "react";
import { useFetchProductListQuery } from "@/services/wooCommerceApi";

const TestToolkit = () => {

    const [categoryId, setCategoryId] = useState(209);

    const { data: products, isLoading, isFetching, isError, error } = useFetchProductListQuery({
        per_page: 24,
        category: categoryId
    });

    useEffect(() => {
        setTimeout(() => {
            setCategoryId(400)
        }, 9000)
    }, []);

    if (isLoading || isFetching) {
        return <p>Loading...</p>
    }


    if (isError) {
        return <p>{error}</p>
    }

    return (
        <>
            <h2>Products</h2>
            <ul>
                {
                    products?.map(({ id, name, price }) => {
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