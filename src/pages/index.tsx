import TopBar from "@/components/TopBar/TopBar";
import Head from "next/head";
import { fetchMenuItems } from "@/services/NavServices";

const Home = () =>
{
  const pageTitle = "Home Page"
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
      </main>
    </>
  )
};

export default Home;

export async function getServerSideProps()
{
  const items = await fetchMenuItems('358');
  console.log(items);
  return {
    props: { res: items }
  };
}
