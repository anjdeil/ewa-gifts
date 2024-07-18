import Head from "next/head";
import React, {FC} from "react";
import styles from './styles.module.scss';
import ProductInfo from '@/components/Shop/ProductInfo/ProductInfo';
import {GetServerSideProps} from "next";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import {customRestApi} from "@/services/CustomRestApi";
import {responseProductInfoType} from "@/types/Services/customApi";
import {AxiosResponse} from "axios";
import {ProductProps} from "@/types/Pages/product";
import {useFetchProductListQuery} from "@/store/custom/customApi";
import {ProductListQueryParamsType} from "@/types/Services/customApi/Product/ProductListQueryParamsType";
import {ProductCardList} from "@/components/Shop/ProductCardsList/ProductCardsList";

const Product: FC<ProductProps> = ({product, breadLinks}) => {

    const slug = product.categories[product.categories.length - 1].slug;
    const productListQueryParams: ProductListQueryParamsType = {
        per_page: 5,
        category: slug,
    }
    const { data, isLoading, isError } = useFetchProductListQuery(productListQueryParams);

    let listPodobnyProducts;

    if (data) {
        const listProduct = [...data.data.items];
        const podobnyProductIndex = listProduct.findIndex((item) => item.slug === product.slug);

        if (podobnyProductIndex !== -1) {
            listProduct.splice(podobnyProductIndex, 1);
        }

        listPodobnyProducts = listProduct.slice(0, 4);

    }
    return (
        <>
            <Head>
                <title>{product.name}</title>
                <meta name="description" content={"name"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.product}>
                <div className="container">
                    <Breadcrumbs links={breadLinks}/>
                    <div>
                        <ProductInfo product={product}/>
                    </div>
                    <div className={styles.product_podobny}>
                        <h2 className={styles.product_podobny__title}>
                            Podobne produkty
                        </h2>
                        <ProductCardList
                            products={listPodobnyProducts}
                            isLoading={isLoading}
                            isError={isError}
                            columns={{ desktop: 4, tablet: 2, mobile: 1 }}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context) => {
    const {slug} = context.params!;
    try {
        const response: AxiosResponse = await customRestApi.get(`products/${slug}`);

        if (!response.data) {
            return {
                notFound: true
            };
        }

        const data: responseProductInfoType = response.data;
        const product = data.data.item;
        const productCategories = transformBreadcrumbsCategories(product.categories);
        const breadLinks = [...productCategories, {name: product.name, url: `/product/${product.slug}`}]

        return {
            props: {
                product,
                breadLinks,
            },
        };

    } catch (error) {
        console.error(error);
        return {
            notFound: true
        };
    }
}

export default Product;
