import Head from "next/head";
import React from "react";
import styles from './styles.module.scss';
import ProductInfo from '@/components/Shop/ProductInfo/ProductInfo';
import {GetServerSideProps} from "next";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import {transformProductCard} from "@/services/transformers";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";

const Product = ({response}) => {

    let info;
    if (response) {
        info = transformProductCard(response);
    }

    if (!info || info.length === 0) {
        return <p>No product found</p>;
    }

    const [{name, slug, categories, type: typeVan}] = info;

    const links = transformBreadcrumbsCategories(categories);

    const copyLinks = [...links];
    copyLinks.push({
        name: name,
        url: `/product/${slug}`,
    });

    return (
        <>
            <Head>
                <title>{name}</title>
                <meta name="description" content={name}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.product__info}>
                <div className="container">
                    <Breadcrumbs links={copyLinks}/>
                    <div>
                        {typeVan === 'simple' ? <ProductInfo data={info}/> : <p>No simple product found</p>}
                    </div>
                </div>
            </main>
        </>
    );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params!;
    let response;

    try {
        const { data } = await wooCommerceRestApi.get("products", { slug });

        response = data;
    } catch (error) {
        return { notFound: true };
    }

    return {
        props: {
            response,
        },
    };
}
export default Product;
