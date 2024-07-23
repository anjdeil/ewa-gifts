import { PageBuilder } from "@/components/PageBuilder";
import wpRestApi from "@/services/wordpress/wpRestAPI";
import { HomeProps } from "@/types";
import Head from "next/head";
import { FC } from "react";
import { GetServerSidePropsContext } from 'next';


const Home: FC<HomeProps> = ({ response }) =>
{
  let sections;
  // const pageTitle = response[0].title.rendered;
  const pageTitle = 'Home';

  if ('sections' in response[0])
  {
    sections = response[0].sections;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main>
        <h1>{pageTitle}</h1>
        <PageBuilder sections={sections} />

      </main >
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function getServerSideProps(context: GetServerSidePropsContext)
{
  const { req } = context;
  const cookies = req.cookies || {};
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
      cookies
    },
  };
}

export default Home;