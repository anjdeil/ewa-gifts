import TopBar from "@/components/TopBar/TopBar";
import Head from "next/head";
import { fetchMenuItems } from "@/services/NavServices";
import { useAppDispatch } from "@/hooks/redux";

const Home = ({ res }) =>
{
  const pageTitle = "Home Page"
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <TopBar res={res}>
      </TopBar>
      <main>
        <h1>{pageTitle}</h1>
      </main>
    </>
  )
};

export default Home;

// export async function getServerSideProps()
// {
//   const items = await fetchMenuItems('358');

//   return {
//     props: { res: items }
//   };
// }
