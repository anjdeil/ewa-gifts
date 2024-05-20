import Head from "next/head";
import CategoryBars from "@/components/CategoryBars/CategoryBars";
import { transformProductCard } from "@/services/transformers";
import { ProductCardList } from "@/components/ProductCardsList";
import { CustomTabs } from "@/components/Tabs";
import TestToolkit from "@/components/TestToolkit";
import { useFetchProductListQuery } from "@/services/wooCommerceApi";
import { ProductSlider } from "@/components/ProductsSlider";
const Home = () => {
  const { data = [], isError, isLoading } = useFetchProductListQuery({
    include: [11753, 1174, 1176, 11012, 2768]
  });

  const products = data.length ? transformProductCard(data) : [];

  const pageTitle = "Home Page";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main
        style={{ padding: 30 }}>
        <h1>{pageTitle}</h1>
        <CategoryBars />
        {/* <ProductCardList isError={isError} isLoading={isLoading} products={products} /> */}
        {/* <TestToolkit /> */}
        <CustomTabs titles={['Najnowsze', 'bestsellers']}>
          <ProductSlider isError={isError} isLoading={isLoading} products={products} />
          <ProductSlider isError={isError} isLoading={isLoading} products={products} />
        </CustomTabs>
      </main >
    </>
  );
};

export default Home;