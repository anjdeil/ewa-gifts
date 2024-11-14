import Notification from "@/components/Layouts/Notification";
import { PageHeader } from "@/components/Layouts/PageHeader";
import PagesNavigation from "@/components/Layouts/PagesNavigation";
import { useAppSelector } from "@/hooks/redux";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import { StatisticAttributeType } from "@/types/Services/customApi/Attribute/StatisticAttributeType";
import { CategoryType, ResponseSingleCategoryCustomType } from "@/types/Services/customApi/Category/CategoryType";
import { typeProductType } from "@/types/Shop";
import { useMediaQuery } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { ProductCardList } from "../ProductCardsList";
import ShopSidebar from "../ShopSidebar";
import MobileSidebar from "../ShopSidebar/MobileSidebar";
import ShopToolbar from "../ShopToolbar";
import styles from "./styles.module.scss";
import { getCanonicalLink } from "@/Utils/getCanonicalLink";
import { domain } from "@/constants";
import { useMemo } from "react";

interface ArchiveProps
{
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
    },
    categorySeo: ResponseSingleCategoryCustomType | null
}

export default function Archive({
    searchTerm,
    products,
    categories,
    page,
    pagesCount,
    productsCount,
    availableAttributes,
    priceRange,
    categorySeo
}: ArchiveProps)
{
    const isMobile = useMediaQuery('(max-width: 768px)');
    /** Get seo data for the current category */
    const categoryItem = categorySeo?.data?.item || null;
    // Open graph
    const { seo_data: categorySeoData = null } = categorySeo?.data?.item || {};
    const { open_graph } = categorySeoData || {};
    const { title, description, image, image_meta } = open_graph || {};
    const { width, height } = image_meta || {};
    // Twitter
    const { twitter } = categorySeoData || {};
    const { title: twitTitle, description: twitDesc, image: twitImage } = twitter || {};

    const currentCategory = Array.isArray(categories) ? categories[categories.length - 1] as CategoryType : null;
    const links = currentCategory ? transformBreadcrumbsCategories(categories as CategoryType[]) :
        searchTerm ? [{ name: "Wyszukaj", url: "" }] : [];

    const popup = useAppSelector(state => state.Popup);
    const router = useRouter();

    const switchPage = (page: number) =>
    {
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

    const canonicalUrl = useMemo(() => getCanonicalLink(router.asPath, domain), [router.asPath]);

    return (
        <>
            <Head>
                {/* Standard Meta Tags */}
                <title>{categorySeoData?.title || ""}</title>
                <meta name="description" content={categorySeoData?.description || currentCategory?.description} />
                <link rel="canonical" href={canonicalUrl} />
                {/* Open Graph Meta Tags */}
                <meta property="og:type" content="website" />
                {title && <meta property="og:title" content={title} />}
                {description && <meta property="og:description" content={description} />}
                {image && <meta property="og:image" content={image} />}
                {width && <meta property="og:image:width" content={width.toString()} />}
                {height && <meta property="og:image:height" content={height.toString()} />}
                {categoryItem?.video_url && <meta property="og:video" content={categoryItem?.video_url} />}
                {/* Optional Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                {twitTitle && <meta name="twitter:title" content={twitTitle} />}
                {twitDesc && <meta name="twitter:description" content={twitDesc} />}
                {twitImage && <meta name="twitter:image" content={twitImage} />}
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
                            {currentCategory?.video_url && (
                                <div
                                    className={`html-text ${styles['product-archive__video']}`}
                                    dangerouslySetInnerHTML={{
                                        __html: `<iframe allowfullscreen autoplay src="${currentCategory.video_url.match(/src="([^"]+)"/)?.[1] || ''}"></iframe>`
                                    }}
                                ></div>
                            )}
                            <div
                                className={`html-text ${styles['product-archive__description']}`}
                                dangerouslySetInnerHTML={{ __html: currentCategory?.description || "" }}
                            ></div>
                        </div>
                    </div>
                </div>
            </main >
        </>
    );
}