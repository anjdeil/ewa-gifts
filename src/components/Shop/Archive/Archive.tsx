import React from "react";
import styles from "./styles.module.scss";
import { typeProductType } from "@/types";
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";
import { useMediaQuery } from "@mui/material";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";
import PagesNavigation from "@/components/Layouts/PagesNavigation";
import Head from "next/head";
import { PageHeader } from "@/components/Layouts/PageHeader";
import ShopSidebar from "../ShopSidebar";
import ShopToolbar from "../ShopToolbar";
import MobileSidebar from "../ShopSidebar/MobileSidebar";
import { ProductCardList } from "../ProductCardsList";
import Notification from "@/components/Layouts/Notification";
import { StatisticAttributeType } from "@/types/Services/customApi/Attribute/StatisticAttributeType";

interface ArchiveProps {
    searchTerm?: string,
    products: typeProductType[],
    categories?: CategoryType[],
    page: string,
    pagesCount: number,
    productsCount: number,
    availableAttributes: StatisticAttributeType[],
    priceRange: {
        min: number,
        max: number
    }
}

export default function Archive({
    searchTerm,
    products,
    categories,
    page,
    pagesCount,
    productsCount,
    availableAttributes,
    priceRange
}: ArchiveProps) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const currentCategory = Array.isArray(categories) ? categories[categories.length - 1] as CategoryType : null;
    const links = currentCategory ? transformBreadcrumbsCategories(categories as CategoryType[]) :
        searchTerm ? [{ name: "Wyszukaj", url: "" }] : [];

    const popup = useAppSelector(state => state.Popup);
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

    const pageTitle = currentCategory ? currentCategory.name :
        searchTerm ? `Wyniki wyszukiwania: ${searchTerm}` : "";

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                {currentCategory?.description && <meta name="description" content={currentCategory.description} />}
            </Head>
            <main className={styles['product-archive']}>
                <div className="container">
                    <PageHeader
                        breadLinks={links}
                        title={pageTitle}
                        isCentered={false}
                        count={currentCategory?.count || productsCount}
                    />
                    <div className={styles['product-archive__container']}>
                        <aside className={styles['product-archive__sidebar']}>
                            {!isMobile && <ShopSidebar availableAttributes={availableAttributes} priceRange={priceRange} />}
                        </aside>
                        <div className={styles['product-archive__archive']}>
                            <ShopToolbar renderPagination={() => renderPagination(page, pagesCount)} />
                            {popup === 'mobile-filter' && <MobileSidebar availableAttributes={availableAttributes} priceRange={priceRange} />}
                            {products.length ?
                                <ProductCardList products={products} columns={{ desktop: 3 }} isShopPage={true} /> :
                                <Notification><p>Nie znaleziono żadnych produktów dla tego żądania.</p></Notification>
                            }
                            <div className={styles['product-archive__nav-wrap']}>
                                {renderPagination(page, pagesCount)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}