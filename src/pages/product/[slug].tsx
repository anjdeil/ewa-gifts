import Head from "next/head";
import React, { FC } from "react";
import styles from './styles.module.scss';
import ProductInfo from '@/components/Shop/ProductInfo/ProductInfo';
import { GetServerSideProps } from "next";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
import { customRestApi } from "@/services/CustomRestApi";
import { responseProductInfoType } from "@/types/Services/customApi";
import { AxiosResponse } from "axios";
import { ProductProps } from "@/types/Pages/product";

const Product: FC<ProductProps> = ({ product, breadLinks }) =>
{
  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={"name"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.product__info}>
        <div className="container">
          <Breadcrumbs links={breadLinks} />
          <div>
            <ProductInfo product={product} />
          </div>
        </div>
      </main>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context) =>
{
  const { slug } = context.params!;
  try
  {
    const response: AxiosResponse = await customRestApi.get(`products/${slug}`);

    if (!response.data)
    {
      return {
        notFound: true
      };
    }

    const data: responseProductInfoType = response.data;
    const product = data.data.item;
    const productCategories = transformBreadcrumbsCategories(product.categories);
    const breadLinks = [...productCategories, { name: product.name, url: `/product/${product.slug}` }]

    return {
      props: {
        product,
        breadLinks,
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

export default Product;
