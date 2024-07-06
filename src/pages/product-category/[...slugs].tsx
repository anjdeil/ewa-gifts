import React, { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import { ProductCardList } from "@/components/Shop";
import { Chip, useMediaQuery } from "@mui/material";
import PagesNavigation from "@/components/Layouts/PagesNavigation";
import { customRestApi } from "@/services/CustomRestApi";
import { ResponseCategoryListType } from "@/types/Services/customApi/Category/ResponseCategoryListType";
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";
import { ProductListQueryParamsType } from "@/types/Services/customApi/Product/ProductListQueryParamsType";
import { typeProductType } from "@/types";
import { ResponseProductListType } from "@/types/Services/customApi/Product/ResponseProductListType";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import ShopSidebar from "@/components/Shop/ShopSidebar";
import ShopToolbar from "@/components/Shop/ShopToolbar";
import styles from "./styles.module.scss";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

/* eslint-disable-next-line react-refresh/only-export-components */
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

    const { slugs, ...params } = context.query;
    if (slugs === undefined || !Array.isArray(slugs)) return {
        notFound: true
    };

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
    const categoriesResponse = categoriesResponseData?.data as ResponseCategoryListType;
    const categories = categoriesResponse?.data && categoriesResponse.data.items as CategoryType[];
    if (!categories?.length) return {
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
     * Collect filters: */
    const productsPerPage = 21;

    const productListQueryParams: ProductListQueryParamsType = {
        page: (page !== "1") ? page : undefined,
        per_page: productsPerPage,
        category: categories[categories.length - 1].slug,
        attribute: typeof params?.attribute === 'string' ? params.attribute : undefined,
        attribute_term: typeof params?.attribute_term === 'string' ? params.attribute_term : undefined,
        min_price: typeof params?.min_price === 'string' ? params.min_price : undefined,
        max_price: typeof params?.max_price === 'string' ? params.max_price : undefined
    };

    /* Fetch products */
    const productsResponseData = await customRestApi.get(`products`, productListQueryParams);
    const productsResponse = productsResponseData?.data as ResponseProductListType;
    const products = productsResponse?.data && productsResponse.data.items;

    /**
     * Get statistic:
     */
    const statistic = productsResponse?.data && productsResponse.data.statistic;
    if (!statistic) return {
        notFound: true
    };

    /* Do not open if pagination page number is more than pages count */
    const pagesCount = Math.ceil(statistic.products_count / productsPerPage);
    if (pagesCount !== 0 && +page > pagesCount) return {
        notFound: true
    }

    return {
        props: {
            products,
            categories,
            page,
            pagesCount,
            priceRange: {
                min: statistic.min_price,
                max: statistic.max_price
            }
        }
    };

}

interface CategoryPagePropsType {
    products: typeProductType[]
    categories: CategoryType[],
    page: string,
    pagesCount: number,
    priceRange: {
        min: number,
        max: number
    }
}

const CategoryPage: FC<CategoryPagePropsType> = ({ products, categories, page, pagesCount, priceRange }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { name, description, count } = categories[categories.length - 1] as CategoryType;
    const links = transformBreadcrumbsCategories(categories);
    const router = useRouter();

    const switchPage = (page: number) => {
        const { slugs, ...params } = router.query;
        if (!Array.isArray(slugs)) return;

        const newSlugs = slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug));

        if (page !== 1) newSlugs.push('page', String(page));

        router.push({
            pathname: router.pathname,
            query: {
                slugs: newSlugs,
                ...params
            }
        })
    }

    const renderPagination = (page: string, pagesCount: number) => (
        <PagesNavigation
            page={+page}
            count={pagesCount}
            siblingCount={1}
            shape="rounded"
            hidePrevButton
            hideNextButton
            onChange={(_, page) => { switchPage(page) }}
        />
    );

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
                        <h1 className={styles['product-category__title']}>{name}</h1>
                        <Chip
                            className={styles['product-category__count']}
                            label={count}
                            size="small"
                        />
                    </div>
                    <div className={styles['product-category__container']}>
                        <aside className={styles['product-category__sidebar']}>
                            {!isMobile && <ShopSidebar priceRange={priceRange} />}
                        </aside>
                        <div className={styles['product-category__archive']}>
                            <ShopToolbar renderPagination={() => renderPagination(page, pagesCount)} />
                            {products && <ProductCardList products={products} columns={{ desktop: 3 }} />}
                            <div className={styles['product-category__nav-wrap']}>
                                {renderPagination(page, pagesCount)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default CategoryPage;