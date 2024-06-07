// import { LoginForm } from "@/components/Forms/LoginForm";
// import { RegistrationForm } from "@/components/Forms/RegistrationForm/RegistrationForm";
// import { ResetPassword } from "@/components/Forms/ResetPassword";
import { PageBuilder } from "@/components/PageBuilder";
import wpRestApi from "@/services/wordpress/wpRestAPI";
import { HomeProps } from "@/types";
import Head from "next/head";
import { FC } from "react";
import { GetServerSidePropsContext } from 'next';
import { NewPassword } from "@/components/Forms/NewPassword";
import { useFetchProductListQuery } from "@/services/wooCommerceApi";
// import { NewPassword } from "@/components/Forms/NewPassword";


const Home: FC<HomeProps> = ({ response, cookies }) =>
{
  let sections;
  const pageTitle = response[0].title.rendered;

  if ('userToken' in cookies)
  {
    // Change interface by adding rules 
  }

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
        {/* <button onClick={() => OnClick()}>Register User</button> */}
        {/* <RegistrationForm /> */}
        {/* <LoginForm /> */}
        {/* <ResetPassword /> */}
        {/* <NewPassword /> */}
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