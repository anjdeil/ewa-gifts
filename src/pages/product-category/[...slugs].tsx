import Head from "next/head";
import React, { useState } from "react";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { useFetchProductListQuery, wooCommerceApi } from "@/store/wooCommerce/wooCommerceApi";
import { ProductCardList } from "@/components/Shop";
import { transformProductCard } from "@/services/transformers";

export const getServerSideProps = async ({ query }) => {

    const { slugs, ...params } = query;

    const slug = slugs[slugs.length - 1];

    const response = await wooCommerceRestApi.get(`products/categories`, {
        ...params,
        slug
    });

    const categoryData = response.data[0];

    console.log(categoryData);


    return {
        props: {
            id: categoryData.id,
            name: categoryData.name,
            slug: categoryData.slug,
            parent: categoryData.parent,
            description: categoryData.description,
            count: categoryData.count
        }
    };
}

const Category = ({ id, name, slug, parent, description, count }) => {

    const [supplierFilter, setSupplierFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [orderBy, setOrderBy] = useState(null);

    let { data: products, isLoading, isError, error } = useFetchProductListQuery({ per_page: 21, category: id })
    if (products) {
        products = transformProductCard(products);
    }

    return (
        <>
            <Head>
                <title>{name}</title>
                <meta name="description" content={description} />
            </Head>
            <main>
                <div className="container">

                    <h1>{name}</h1>
                    <span>{count}</span>
                    <ProductCardList isLoading={isLoading} isError={isError} products={products} />
                </div>
            </main>
        </>
    )
}

export default Category;