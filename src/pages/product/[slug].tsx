import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { ProductCardList } from "@/components/Shop/ProductCardsList/ProductCardsList";
import ProductInfo from '@/components/Shop/ProductInfo/ProductInfo';
import { customRestApi } from "@/services/CustomRestApi";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import { useFetchProductListQuery } from "@/store/custom/customApi";
import { ProductListQueryParamsType } from "@/types/Services/customApi/Product/ProductListQueryParamsType";
import { typeProductType } from "@/types/Shop";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FC } from "react";
import styles from './styles.module.scss';
import { responseSingleCustomApi } from "@/types/Services/customApi";
import { Box } from "@mui/material";

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
        const product = productResponse?.data && productResponse.data.item;

        return {
            props: {
                product
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
    product: typeProductType
}

const Product: FC<ProductPropsType> = ({ product }) =>
{
    console.log('product...', product);

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

    return (
        <>
            <Head>
                <title>{product?.name}</title>
                {product?.description && <meta name="description" content={product.description} />}
            </Head>

            <main className={styles['product']}>
                <Box className="container">
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
