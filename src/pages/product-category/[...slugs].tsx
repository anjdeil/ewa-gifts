import React, { FC, useState } from "react";

import Head from "next/head";
import { useParams } from 'next/navigation'
import { useRouter } from "next/router";

import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { useFetchProductListQuery } from "@/store/custom/customApi";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import { transformProductCard } from "@/services/transformers";

import { ProductCardList } from "@/components/Shop";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { Chip, useMediaQuery } from "@mui/material";
import PagesNavigation from "@/components/Layouts/PagesNavigation";
import ShopSidebar from "@/components/Shop/ShopSidebar";
import ShopToolbar from "@/components/Shop/ShopToolbar";

import styles from "./styles.module.scss";
import { customRestApi } from "@/services/CustomRestApi";
import { ResponseCategoryListType } from "@/types/Services/customApi/Category/ResponseCategoryListType";
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";

export const getServerSideProps = async ({ query }) => {

    const { slugs } = query;

    /** Pagination:
     *
     * Find pagination param */
    const pageSlugIndex = slugs.findIndex((slug: string) => slug === 'page');
    const page = pageSlugIndex >= 0 ? slugs[pageSlugIndex + 1] : '1';
    if (page === undefined || page === '0') return {
        notFound: true
    };

    /** Categories:
     *
     * Find categories param */
    const lastCategorySlugIndex = pageSlugIndex >= 0 ? pageSlugIndex : slugs.length;
    const categorySlugs = slugs.slice(0, lastCategorySlugIndex);

    /* Сannot be more than two categories */
    if (categorySlugs[2]) return {
        notFound: true
    };

    /* Fetch categories */
    const categoriesResponseData = await customRestApi.get(`categories`, {
        slugs: categorySlugs.join(',')
    });
    const categoriesResponse = categoriesResponseData.data as ResponseCategoryListType;
    const categories = categoriesResponse.data && categoriesResponse.data.items as CategoryType[];
    if (!categories) return {
        notFound: true
    };

    /* Sort categories */
    categories.sort((a, b) => a.parent_id - b.parent_id);

    /* Do not open a subcategory without a parent category */
    if (categories[0].parent_id !== 0) return {
        notFound: true
    };

    /* Check if the second category is the child of the first category */
    if (categories[1] && categories[1].parent_id !== categories[0].id) return {
        notFound: true
    };


    /**
     * Products:
     *
     * Collect filters:
     */
    // const productsPerPage = 21;
    // const productListQueryParams = {
    //     page,
    //     per_page: productsPerPage,
    //     order_by: undefined,
    //     order: undefined,
    //     min_price: undefined,
    //     max_price: undefined,
    //     category: categories ? categories[categories.length - 1].slug : undefined,
    //     attribute: undefined,

    // };


    /* Fetch products */


    // const notFoundIndex = categories.findIndex(category => category === undefined);
    // if (notFoundIndex >= 0) {
    //     return {
    //         notFound: true
    //     }
    // }

    // const productsPerPage = 21;
    // let { count: categoryProductsCount } = categories[categories.length - 1];
    // categoryProductsCount = categoryProductsCount || 1;
    // const pagesCount = Math.ceil(categoryProductsCount / productsPerPage);

    // if (+page > +pagesCount) return {
    //     notFound: true
    // }

    return {
        props: {
            categories,
            page
        }
    };

}

interface CategoryPagePropsType {
    categories: CategoryType[],
    page: string
}

const CategoryPage: FC<CategoryPagePropsType> = ({ categories, page }) => {
    // const isMobile = useMediaQuery('(max-width: 768px)');

    // console.log(categories);

    // const router = useRouter();
    // const { slugs } = useParams();
    // const pageSlugIndex = slugs.findIndex(slug => slug === 'page');
    // const lastCategorySlugIndex = pageSlugIndex >= 0 ? pageSlugIndex : slugs.length;
    // const categorySlugs = slugs.slice(0, lastCategorySlugIndex);

    const { name, description } = categories[categories.length - 1] as CategoryType;

    const productsPerPage = 21;
    // const pagesCount = Math.ceil(count / productsPerPage);

    // const onChangePage = (evt, page) => {
    //     router.push(`/product-category/${categorySlugs.join('/')}/page/${page}`);
    // }

    // let { data: products, isProductsLoading, isProductsError, productsError } = useFetchProductListQuery({ per_page: productsPerPage, category: id, page })
    const { data: products, isLoading, isError } = useFetchProductListQuery({ per_page: productsPerPage })
    // const products = productsData ? transformProductCard(productsData.data.items) : [];

    const links = transformBreadcrumbsCategories(categories);

    // const renderPagination = () => (
    // <PagesNavigation
    //     page={+page}
    //     count={pagesCount}
    //     siblingCount={1}
    //     shape="rounded"
    //     hidePrevButton
    //     hideNextButton
    //     onChange={onChangePage}
    // />
    // );

    return (
        <>
            <Head>
                <title>{name}</title>
                {description && <meta name="description" content={description} />}
            </Head>
            <main className={styles['product-category']}>
                <div className="container">
                    <Breadcrumbs links={links} />
                    <div className={styles['product-category__titling']}>
                        {/* <h1 className={styles['product-category__title']}>{name}</h1> */}
                        {/* <Chip
                            className={styles['product-category__count']}
                            label={count}
                            size="small"
                        /> */}
                    </div>
                    <div className={styles['product-category__container']}>
                        <aside className={styles['product-category__sidebar']}>
                            {/* {!isMobile && <ShopSidebar />} */}
                        </aside>
                        <div className={styles['product-category__archive']}>
                            {/* <ShopToolbar renderPagination={renderPagination} /> */}
                            {products && <ProductCardList isLoading={isLoading} isError={isError} products={products.data.items} columns={{ desktop: 3 }} />}
                            <div className={styles['product-category__nav-wrap']}>
                                {/* {renderPagination()} */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default CategoryPage;