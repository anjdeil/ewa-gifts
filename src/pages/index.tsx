import { RegistrationForm } from "@/components/Forms/RegistrationForm/RegistrationForm";
import { PageBuilder } from "@/components/PageBuilder";
import wpRestApi from "@/services/wordpress/WPRestAPI";
import { useFetchUserRegistrationMutation } from "@/store/wooCommerce/wooCommerceApi";
import { HomeProps } from "@/types";
import Head from "next/head";
import { FC } from "react";

const Home: FC<HomeProps> = ({ response }) =>
{
  let sections;
  const pageTitle = response[0].title.rendered;

  if (response)
  {
    sections = response[0].sections;
  }

  const [fetchUserToken] = useFetchUserRegistrationMutation();

  const OnClick = async () =>
  {
    try
    {
      const response = await fetchUserToken({ email: 'test@gmai.com' });
      console.log('User', response);
    } catch (err)
    {
      console.log(err);
    }
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main>
        <h1>{pageTitle}</h1>
        {/* <button onClick={() => OnClick()}>Register User</button> */}
        <RegistrationForm />
        {/* <PageBuilder sections={sections} /> */}
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