import React, { useEffect, useState } from "react";
import { useFetchProductListQuery } from "@/services/wooCommerceApi";
import { useSelector, useDispatch } from 'react-redux';
import { error } from "console";
import { fetchProductList } from "@/store/reducers/ActionCreators";

const TestToolkit = () =>
{

    const dispatch = useDispatch();
    const { productList, isLoading, error } = useSelector((state) => state.productList);
    const [categoryId, setCategoryId] = useState(209);

    // const { data: products, isLoading, isFetching, isError, error } = useFetchProductListQuery({
    //     per_page: 24,
    //     category: categoryId
    // });

    useEffect(() =>
    {
        dispatch(fetchProductList({
            per_page: 24,
            category: categoryId
        }));
        console.log(isLoading);

        setTimeout(() =>
        {
            setCategoryId(400)
        }, 9000)
    }, [categoryId]);

    if (isLoading)
    {
        return <p>Loading...</p>
    }


    if (error)
    {
        return <p>{error}</p>
    }

    return (
        <>
            <h2>Products</h2>
            <ul>
                {
                    productList?.map(({ id, name, price }) =>
                    {
                        return (
                            <li key={id}>{name}, <b>${price}</b></li>
                        )
                    })
                }
            </ul>
            <button >Open category with id 400</button>
        </>
    )
}

export default TestToolkit;