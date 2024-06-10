import React, { useState } from "react";

import Head from "next/head";
import { useParams } from 'next/navigation'
import { useRouter } from "next/router";

import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { useFetchProductListQuery } from "@/store/wooCommerce/wooCommerceApi";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import { transformProductCard } from "@/services/transformers";

import { ProductCardList } from "@/components/Shop";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { Chip, useMediaQuery } from "@mui/material";
import PagesNavigation from "@/components/Layouts/PagesNavigation";
import ShopSidebar from "@/components/Shop/ShopSidebar";
import ShopToolbar from "@/components/Shop/ShopToolbar";

import styles from "./styles.module.scss";

export const getServerSideProps = async ({ query }) => {

    const { slugs } = query;

    const pageSlugIndex = slugs.findIndex(slug => slug === 'page');
    const lastCategorySlugIndex = pageSlugIndex >= 0 ? pageSlugIndex : slugs.length;
    const page = pageSlugIndex >= 0 ? slugs[pageSlugIndex + 1] : '1';
    const categorySlugs = slugs.slice(0, lastCategorySlugIndex);

    if (page === undefined || page === '0') return {
        notFound: true
    }

    const categoryPromises = categorySlugs.map((slug) => wooCommerceRestApi.get(`products/categories`, { slug }));
    const categoryResponses = await Promise.all(categoryPromises);

    const categories = categoryResponses.reduce((prev, curr) => [...prev, curr.data[0]], []);

    const notFoundIndex = categories.findIndex(category => category === undefined);
    if (notFoundIndex >= 0) {
        return {
            notFound: true
        }
    }

    const productsPerPage = 21;
    let { count: categoryProductsCount } = categories[categories.length - 1];
    categoryProductsCount = categoryProductsCount || 1;
    const pagesCount = Math.ceil(categoryProductsCount / productsPerPage);

    if (+page > +pagesCount) return {
        notFound: true
    }

    return {
        props: {
            categories,
            page
        }
    };

}

const Category = ({ categories, page }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const router = useRouter();
    const { slugs } = useParams();
    const pageSlugIndex = slugs.findIndex(slug => slug === 'page');
    const lastCategorySlugIndex = pageSlugIndex >= 0 ? pageSlugIndex : slugs.length;
    const categorySlugs = slugs.slice(0, lastCategorySlugIndex);

    const { id, name, slug, parent, description, count } = categories[categories.length - 1];

    const productsPerPage = 21;
    const pagesCount = Math.ceil(count / productsPerPage);

    const onChangePage = (evt, page) => {
        router.push(`/product-category/${categorySlugs.join('/')}/page/${page}`);
    }

    let { data: products, isProductsLoading, isProductsError, productsError } = useFetchProductListQuery({ per_page: productsPerPage, category: id, page })
    if (products) {
        products = transformProductCard(products);
    }

    const links = transformBreadcrumbsCategories(categories);

    const renderPagination = () => (
        <PagesNavigation
            page={+page}
            count={pagesCount}
            siblingCount={1}
            shape="rounded"
            hidePrevButton
            hideNextButton
            onChange={onChangePage}
        />
    );

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
                            {!isMobile && <ShopSidebar />}
                        </aside>
                        <div className={styles['product-category__archive']}>
                            <ShopToolbar renderPagination={renderPagination} />
                            <ProductCardList isLoading={isProductsLoading} isError={isProductsError} products={products} columns={{ desktop: 3 }} />
                            <div className={styles['product-category__nav-wrap']}>
                                {renderPagination()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Category;