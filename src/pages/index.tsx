import Head from "next/head";
import CategoryBars from "@/components/CategoryBars/CategoryBars";
import { useFetchProductListQuery } from "@/store/actionCreators";
import { transformProductCard } from "@/services/transformers";
import { ProductCardList } from "@/components/ProductCardsList";
import { CustomTabs } from "@/components/Tabs";
import TestToolkit from "@/components/TestToolkit";
const Home = () => {
  // const { data: initialProducts, isError, isLoading } = useFetchProductListQuery({});

  // let products = null;

  // if (initialProducts)
  // {
  //   products = transformProductCard(initialProducts);
  // }

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
          <p>Najnowsze</p>
          <p>bestsellers</p>
        </CustomTabs>
      </main >
    </>
  );
};

export default Home;