import TopBar from "@/components/TopBar/TopBar";
import Head from "next/head";
import TestToolkit from "@/components/TestToolkit";

const Home = () =>
{
  const pageTitle = "Home Page";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <TopBar>
      </TopBar>
      <main>
        <h1>{pageTitle}</h1>
        <TestToolkit />
      </main>
    </>
  )
};

export default Home;




