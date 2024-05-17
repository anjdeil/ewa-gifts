import Head from "next/head";
import CategoryBars from "@/components/CategoryBars/CategoryBars";
import { transformProductCard } from "@/services/transformers";
import { ProductCardList } from "@/components/ProductCardsList";
import { CustomTabs } from "@/components/Tabs";
import TestToolkit from "@/components/TestToolkit";
import { useFetchProductListQuery } from "@/services/wooCommerceApi";
import { ProductSlider } from "@/components/ProductsSlider";
const Home = () =>
{
  const { data: initialProducts, isError, isLoading } = useFetchProductListQuery({});

  let products = null;
  let firstPart = null;
  let secondPart = null;

  if (initialProducts)
  {
    products = transformProductCard(initialProducts);
    firstPart = products.slice(0, 5);
    secondPart = products.slice(5);
  }

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
          <ProductSlider isError={isError} isLoading={isLoading} products={firstPart} />
          <ProductSlider isError={isError} isLoading={isLoading} products={secondPart} />
        </CustomTabs>
      </main >
    </>
  );
};

export default Home;