import React, { useEffect, useState } from "react";
import { useFetchAllCategoriesListQuery } from "@/services/wooCommerceApi";

const TestToolkit = () => {


    let { data: categories = [], isLoading, isFetching, isError, error } = useFetchAllCategoriesListQuery();


    if (isLoading || isFetching) {
        return <p>LOADING...</p>
    }

    if (isError) {
        return <p>{error}</p>
    }

    return (
        <>
            <h2>Categories</h2>
            <ol>
                {
                    categories.map(({ name }) => (
                        <li>{name}</li>
                    ))
                }
            </ol>
            <button >Open category with id 400</button>
        </>
    )
}

export default TestToolkit;