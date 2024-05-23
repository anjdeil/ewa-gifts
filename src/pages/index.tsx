import { PageBuilder } from "@/components/PageBuilder";
import { transformersPageBuilder } from "@/services/transformers/pageBuilder";
import wpRestApi from "@/services/wordpress/WPRestAPI";
import Head from "next/head";

const Home = ({ response }) =>
{
  let sections;
  if (response.length > 0)
  {
    console.log(response);
    sections = transformersPageBuilder(response);
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

        <PageBuilder sections={sections} />
      </main >
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function getServerSideProps() 
{
  let response;
  try
  {
    response = await wpRestApi.get('pages', { slug: `homepage` });
    response = response.data;
  } catch (error)
  {
    response = (error as Error).message;
  }

  return {
    props: {
      response,
    },
  };
}

export default Home;