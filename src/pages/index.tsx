import Head from "next/head";
import { Slider } from "@/components/Slider";

const Home = () => {
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
        {/* <TestToolkit /> */}
        <Slider />
      </main >
    </>
  );
};

export default Home;
