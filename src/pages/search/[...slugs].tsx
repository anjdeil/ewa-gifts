import { customRestApi } from "@/services/CustomRestApi";
import { ProductListQueryParamsType } from "@/types/Services/customApi/Product/ProductListQueryParamsType";
import { ResponseProductListType } from "@/types/Services/customApi/Product/ResponseProductListType";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Archive from "@/components/Shop/Archive";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        const { slugs, ...params } = context.query;
        if (slugs === undefined || !Array.isArray(slugs)) return {
            notFound: true
        };

        /** Pagination:
         *
         * Find pagination param */
        const pageSlugIndex = slugs.findIndex((slug: string) => slug === 'page');
        const page = pageSlugIndex >= 0 && Array.isArray(slugs) ? slugs[pageSlugIndex + 1] : '1';
        if (page === undefined || page === '0') return {
            notFound: true
        };

        /** Search:
         *
         * Find search param */
        const lastSearchSlugIndex = pageSlugIndex >= 0 ? pageSlugIndex : slugs.length;
        const searchSlugs = slugs.slice(0, lastSearchSlugIndex);

        /* Сannot be more than one search slug */
        if (searchSlugs[1]) return {
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
            search: searchSlugs[0],
            attribute: typeof params?.attribute === 'string' ? params.attribute : undefined,
            attribute_term: typeof params?.attribute_term === 'string' ? params.attribute_term : undefined,
            order_by: typeof params?.order_by === 'string' ? params.order_by : undefined,
            order: typeof params?.order === 'string' ? params.order : undefined,
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
        if (!statistic) {
            throw new Error("Zaszła pomyłka");
        }

        /* Do not open if pagination page number is more than pages count */
        const pagesCount = Math.ceil(statistic.products_count / productsPerPage);
        if (pagesCount !== 0 && +page > pagesCount) return {
            notFound: true
        }
        return {
            props: {
                products,
                productsCount: statistic.products_count,
                searchTerm: searchSlugs[0],
                page,
                pagesCount,
                availableAttributes: statistic.attributes,
                priceRange: {
                    min: statistic.min_price,
                    max: statistic.max_price
                }
            }
        };
    } catch (error) {
        context.res.statusCode = 500;
        console.log(error);
        return { props: { error: "Something went wrong!" } };
    }
}

export default Archive;