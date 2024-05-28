import { PageBuilder } from "@/components/PageBuilder";
import wpRestApi from "@/services/wordpress/WPRestAPI";
import Head from "next/head";

const Home = ({ response }) =>
{
  let sections;
  const pageTitle = response[0].title.rendered;

  if (response)
  {
    sections = response[0].sections;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* <h1>{pageTitle}</h1> */}
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