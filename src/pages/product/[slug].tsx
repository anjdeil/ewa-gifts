import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useFetchProductListQuery } from "@/store/wooCommerce/wooCommerceApi";
import {transformProductCard} from "@/services/transformers";


const Product = () =>
{


  const router = useRouter();
  const { slug } = router.query;

  const { data } = useFetchProductListQuery({ slug });
  let products;
  if (data) {
      products = transformProductCard(data);
  }
  const {name,images,description,sku} = products.at(0);
  console.log(name,images,description,sku);

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>

          <p>
            {slug}
          </p>
          <div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Product;
