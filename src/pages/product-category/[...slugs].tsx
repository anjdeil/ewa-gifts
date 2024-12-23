import { customRestApi } from "@/services/CustomRestApi";
import { ResponseCategoryListType } from "@/types/Services/customApi/Category/ResponseCategoryListType";
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";
import { ProductListQueryParamsType } from "@/types/Services/customApi/Product/ProductListQueryParamsType";
import { ResponseProductListType } from "@/types/Services/customApi/Product/ResponseProductListType";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Archive from "@/components/Shop/Archive";
import { validateResponseSingleCategory } from "@/Utils/zodValidators/validateResponseSingleCategory";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    try
    {

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

        /* Return 404 if the categories not found */
        if (!categories?.length) return {
            notFound: true
        };

        /* Return 404 if the categories in the response are less than the requested categories */
        if (categories.length < categorySlugs.length) return {
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
        const category = categories[categories.length - 1].slug;

        const productListQueryParams: ProductListQueryParamsType = {
            page: (page !== "1") ? page : undefined,
            per_page: productsPerPage,
            category: category,
            pa_supplier: typeof params?.pa_supplier === 'string' ? params.pa_supplier : undefined,
            pa_base_color: typeof params?.pa_base_color === 'string' ? params.pa_base_color : undefined,
            order_by: typeof params?.order_by === 'string' ? params.order_by : undefined,
            order: typeof params?.order === 'string' ? params.order : undefined,
            min_price: typeof params?.min_price === 'string' ? params.min_price : undefined,
            max_price: typeof params?.max_price === 'string' ? params.max_price : undefined
        };

        /* Fetch products */
        const productsResponseData = await customRestApi.get(`products`, productListQueryParams);
        const productsResponse = productsResponseData?.data as ResponseProductListType;
        const products = productsResponse?.data && productsResponse.data.items;

        /* Fetch category SEO and validate */
        const categorySeoResponse = await customRestApi.get(`categories/${category}`);
        const isCategorySeoValid = await validateResponseSingleCategory(categorySeoResponse.data);
        let categorySeo = null;
        if (isCategorySeoValid)
            categorySeo = categorySeoResponse.data;

        /**
         * Get statistic:
         */
        const statistic = productsResponse?.data && productsResponse.data.statistic;
        console.log('statisticssss', productsResponse);
        if (!statistic)
        {
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
                categories,
                page,
                pagesCount,
                availableAttributes: statistic.attributes,
                priceRange: {
                    min: statistic.min_price,
                    max: statistic.max_price
                },
                categorySeo: categorySeo
            }
        };

    } catch (error)
    {
        context.res.statusCode = 500;
        console.error(error);
        return { props: { error: "Something went wrong!" } };
    }
}

export default Archive;