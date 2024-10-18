import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { ProductCardList } from "@/components/Shop/ProductCardsList/ProductCardsList";
import ProductInfo from '@/components/Shop/ProductInfo/ProductInfo';
import { customRestApi } from "@/services/CustomRestApi";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import { useFetchProductListQuery } from "@/store/custom/customApi";
import { responseSingleCustomApi } from "@/types/Services/customApi";
import { ProductListQueryParamsType } from "@/types/Services/customApi/Product/ProductListQueryParamsType";
import { typeProductType } from "@/types/Shop";
import { Box } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FC, useMemo } from "react";
import styles from './styles.module.scss';
import { domain } from "@/constants";
import { getCanonicalLink } from "@/Utils/getCanonicalLink";
import { useRouter } from "next/router";
import { getProductSeoSchema } from "@/Utils/getProductSeoSchema";
import { ProductSeoType } from "@/types/seo";

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const { slug } = context.query;

    try
    {
        const productResponseData = await customRestApi.get(`products/${slug}`);

        if (!productResponseData?.data)
        {
            return {
                notFound: true
            };
        }

        const productResponse = productResponseData.data as responseSingleCustomApi;
        const product = productResponse?.data && productResponse.data.item as typeProductType;
        const domain = process.env.FRONT_URL || "";

        if (!product)
        {
            console.error('Error: Product not found');
            return {
                notFound: true
            };
        }

        const productSeoSchema = getProductSeoSchema(context.resolvedUrl, product, domain);

        return {
            props: {
                product,
                productSeoSchema
            },
        };

    } catch (error)
    {
        console.error(error);
        return {
            notFound: true
        };
    }
}

interface ProductPropsType
{
    product: typeProductType,
    productSeoSchema: ProductSeoType | null
}

const Product: FC<ProductPropsType> = ({ product, productSeoSchema }) =>
{
    const router = useRouter();
    const slug = product.categories[product.categories.length - 1].slug;
    const productListQueryParams: ProductListQueryParamsType = {
        per_page: 5,
        category: slug,
    }

    /* Get breadcrumbs */
    const categoriesLinks = transformBreadcrumbsCategories(product.categories);

    /* Get related products */
    const { data: relatedProductsData, isLoading, isError } = useFetchProductListQuery(productListQueryParams);
    const relatedProducts = relatedProductsData?.data && relatedProductsData.data.items;
    const filteredRelatedProducts = relatedProducts?.filter((related: typeProductType) => related.slug !== product.slug);
    if (filteredRelatedProducts && filteredRelatedProducts?.length > 4) filteredRelatedProducts.splice(-1);

    const canonicalUrl = useMemo(() => getCanonicalLink(router.asPath, domain), [router.asPath]);
    const { title, description } = product.seo_data;

    return (
        <>
            <Head>
                <title>{title || ''}</title>
                {product?.description && <meta name="description" content={description || product.description} />}
                <link rel="canonical" href={canonicalUrl} />
                {productSeoSchema && <script type="application/ld+json">{JSON.stringify(productSeoSchema)}</script>}
            </Head>

            <main className={styles['product']}>
                <Box className={`container ${styles['product__wrapper']}`}>
                    <Breadcrumbs links={categoriesLinks} />
                    <ProductInfo product={product} key={product.slug} />
                    {filteredRelatedProducts &&
                        <Box className={styles['product__relative-products']}>
                            <h2 className={`secondary-title ${styles['product__relative-products-title']}`}>
                                Produkty powiązane
                            </h2>

                            <ProductCardList
                                products={filteredRelatedProducts}
                                isLoading={isLoading}
                                isError={isError}
                                columns={{ desktop: 4, tablet: 3, mobile: 2 }}
                            />
                        </Box>
                    }
                </Box>
            </main>
        </>
    );
};

export default Product;
