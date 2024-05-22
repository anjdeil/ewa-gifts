import Head from "next/head";
// import CategoryBars from "@/components/Common/CategoryBars/CategoryBars";
import { transformProductCard } from "@/services/transformers";
// import { ProductCardList } from "@/components/Shop/ProductCardsList";
// import { CustomTabs } from "@/components/Tabs";
// import TestToolkit from "@/components/TestToolkit";
import { useFetchProductListQuery } from "@/store/wooCommerce/wooCommerceApi";
// import { ProductSlider } from "@/components/Shop/ProductsSlider";
// import { useSendAnEmailMutation } from "@/store/contactForm7/contactForm7Api";
// import axios from "axios";
// import { SubscriptionForm } from "@/components/SubscriptionForm";
// import { Box, Skeleton } from "@mui/material";
const Home = () => {
  const { data: initialProducts, isError, isLoading } = useFetchProductListQuery({});

  let products = null;
  // let firstPart = null;
  // let secondPart = null;

  if (initialProducts) {
    products = transformProductCard(initialProducts);
    // firstPart = products.slice(0, 5);
    // secondPart = products.slice(5);
  }

  // const formData = new FormData();
  // formData.append('_wpcf7_unit_tag', 'wpcf7-c68d4a7-o1');
  // formData.append('your-email', 'asd@mail.com');

  // const formData = {
  //   _wpcf7_unit_tag: 'wpcf7-c68d4a7-o1',
  //   'your-email': 'asd@mail.com'
  // };

  // const id = 22199;

  // const [sendAnEmail, { data }] = useSendAnEmailMutation();

  // const handleClick = async () =>
  // {
  //   const response = await sendAnEmail({ id, formData });
  //   console.log(response);
  // };

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
        {/* <CategoryBars /> */}
        {/* <button onClick={() => handleClick()}>Click</button> */}
        {/* <ProductCardList isError={isError} isLoading={isLoading} products={products} /> */}
        {/* <TestToolkit /> */}
        {/* <CustomTabs titles={['Najnowsze', 'bestsellers']}>
          <ProductSlider isError={isError} isLoading={isLoading} products={firstPart} />
          <ProductSlider isError={isError} isLoading={isLoading} products={secondPart} />
        </CustomTabs> */}
        {/* <SubscriptionForm /> */}
      </main >
    </>
  );
};

export default Home;