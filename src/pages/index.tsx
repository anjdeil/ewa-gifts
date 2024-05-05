import Head from "next/head";
import TestToolkit from "@/components/TestToolkit";
import SearchBar from "@/components/SearchBar";
import { useFetchMenuItemsQuery } from "@/services/ActionCreators";

const Home = () =>
{
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
      <main
        style={{ padding: 30 }}>
        <h1>{pageTitle}</h1>
        <SearchBar />
        <TestToolkit />
      </main >
    </>
  );
};

export default Home;
