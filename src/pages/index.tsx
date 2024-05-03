import TopBar from "@/components/TopBar/TopBar";
import Head from "next/head";
import TestToolkit from "@/components/TestToolkit";
import Search from "@/components/Search";
import { useFetchMenuItemsQuery } from "@/services/ActionCreators";

const Home = () => {
  const pageTitle = "Home Page";
  const { data, isLoading, isError, error } = useFetchMenuItemsQuery({ menus: "358" });

  isLoading && console.log('Loading...');
  isError && console.log(error);
  data && console.log(data);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <TopBar />
      <main>
        <h1>{pageTitle}</h1>
        <Search />
        <TestToolkit />
      </main>
    </>
  );
};

export default Home;
