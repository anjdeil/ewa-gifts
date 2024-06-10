// import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import styles from './styles.module.scss';
import { useFetchProductListQuery } from "@/store/wooCommerce/wooCommerceApi";
import ProductInfo from '@/components/Shop/ProductInfo/ProductInfo';

import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import {transformProductCard} from "@/services/transformers";
import transformBreadcrumbsCategories from "@/services/transformers/woocommerce/transformBreadcrumbsCategories";
// import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
// import {useLazyFetchProductVariationsQuery} from '@/store/wooCommerce/wooCommerceApi';

const Product = () =>
{

  // const router = useRouter();
  // const { slug } = router.query;

  const { data } = useFetchProductListQuery({slug: '4-kolorowy-zakreslacz-kwadratowy-trafalgar' });
  console.log(data);
  let info;
  if (data) {
    info = transformProductCard(data);
  }

  if (!info || info.length === 0) {
    return <p>No product found</p>;
  }

  const [{ name, categories, type:typeVan }] = info;
  const links = transformBreadcrumbsCategories(categories);
  console.log(
      links, 'Breadcrumbs'
  )
  // const [fetchProductVariations, { data: variations, isLoading: isVariationsLoading, isError: isVariationsError }] = useLazyFetchProductVariationsQuery();
  //
  // const handlerClick = () => {
    // fetchProductVariations(id);
  // };
  // console.log(variations,isVariationsLoading,isVariationsError);

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.product__info}>
        <div className="container">
          <Breadcrumbs links={links} />
          <div>
            {typeVan === 'simple' ? <ProductInfo data={info}/>:<p>No simple product found</p>}
          </div>
        </div>
      </main>
    </>
  );
}


// export const getServerSideProps = async ({ query }) => {
//     const { slugs } = query;
//     if (!slugs || !Array.isArray(slugs)) {
//         return {
//             notFound: true,
//         };
//     }
//     const pageSlugIndex = slugs.findIndex(slug => slug === 'page');
//     const lastCategorySlugIndex = pageSlugIndex >= 0 ? pageSlugIndex : slugs.length;
//     const categorySlugs = slugs.slice(0, lastCategorySlugIndex);
//
//     const categoryPromises = categorySlugs.map((slug) => wooCommerceRestApi.get(`products/categories`, { slug }));
//     const categoryResponses = await Promise.all(categoryPromises);
//
//     const categories = categoryResponses.reduce((prev, curr) => [...prev, curr.data[0]], []);
//
//     const notFoundIndex = categories.findIndex(category => category === undefined);
//     if (notFoundIndex >= 0) {
//         return {
//             notFound: true
//         }
//     }
//     return {
//         props: {
//             categories,
//         }
//     };
//
// }
export default Product;
