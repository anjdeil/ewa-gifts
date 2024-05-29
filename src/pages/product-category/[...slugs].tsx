import Head from "next/head";
import React, { useState } from "react";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { useFetchProductListQuery, wooCommerceApi } from "@/store/wooCommerce/wooCommerceApi";
import { ProductCardList } from "@/components/Shop";
import { transformProductCard } from "@/services/transformers";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import styles from "./styles.module.scss";
import { Chip } from "@mui/material";

export const getServerSideProps = async ({ query }) => {

    const { slugs, ...params } = query;

    const categoryPromises = slugs.map((slug) => wooCommerceRestApi.get(`products/categories`, { slug }));
    const categoryResponses = await Promise.all(categoryPromises);

    const categories = categoryResponses.reduce((prev, curr) => [...prev, curr.data[0]], []);

    const notFoundIndex = categories.findIndex(category => category === undefined);
    if (notFoundIndex >= 0) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            categories
        }
    };

}

const Category = ({ categories }) => {


    const [supplierFilter, setSupplierFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [orderBy, setOrderBy] = useState(null);

    const { id, name, slug, parent, description, count } = categories[categories.length - 1];

    let { data: products, isProductsLoading, isProductsError, productsError } = useFetchProductListQuery({ per_page: 21, category: id })
    if (products) {
        products = transformProductCard(products);
    }

    const links = transformBreadcrumbsCategories(categories);


    return (
        <>
            <Head>
                <title>{name}</title>
                <meta name="description" content={description} />
            </Head>
            <main className={styles['product-category']}>
                <div className="container">
                    <Breadcrumbs links={links} />
                    <div className={styles['product-category__titling']}>
                        <h1 className={styles['product-category__title']}>{name}</h1>
                        <Chip
                            className={styles['product-category__count']}
                            label={count}
                            size="small"
                        />
                    </div>
                    <div className={styles['product-category__container']}>
                        <aside className={styles['product-category__sidebar']}>

                        </aside>
                        <div className={styles['product-category__archive']}>
                            <ProductCardList isLoading={isProductsLoading} isError={isProductsError} products={products} columns={{ desktop: 3, tablet: 4, mobile: 2 }} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Category;