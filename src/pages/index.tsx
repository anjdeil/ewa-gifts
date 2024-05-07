import Head from "next/head";
import TestToolkit from "@/components/TestToolkit";
import SearchBar from "@/components/SearchBar";

const Home = () => {
  const pageTitle = "Home Page";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main
        style={{ padding: 30, background: "#F6F8FC" }}>
        <h1>{pageTitle}</h1>
        <SearchBar />
        <TestToolkit />
      </main >
    </>
  );
};

export default Home;
