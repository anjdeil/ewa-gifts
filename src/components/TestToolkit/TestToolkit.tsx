import React, { useEffect, useState } from "react";
import { useFetchCategoriesListQuery } from "@/services/wooCommerceApi";

const TestToolkit = () =>
{


    const { data: categories, isLoading, isFetching, isError, error } = useFetchCategoriesListQuery();

    if (isLoading || isFetching)
    {
        return <p>Loading...</p>
    }

    if (isError)
    {
        return <p>{error}</p>
    }

    return (
        <>
            <h2>Categories</h2>
            <ul>
                {
                    categories?.map(({ id, categoryName, slug, subcategories }) =>
                    {
                        return (
                            <>
                                <li key={id}>{categoryName}, <b>{slug}</b></li>
                                <ul>
                                    {
                                        subcategories?.map(({ id, categoryName, slug }) => (
                                            <li key={id}>{categoryName}, <b>{slug}</b></li>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                    })
                }
            </ul>
            <button >Open category with id 400</button>
        </>
    )
}

export default TestToolkit;