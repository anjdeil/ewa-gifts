import Head from "next/head";
import { useCookies } from 'react-cookie';
import { LoginForm } from "@/components/Forms/LoginForm";
import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { jwtApi, useFetchCheckLoggedInMutation } from "@/store/jwt/jwtApi";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import axios from "axios";

export const MyAccountPropsSchema = z.object({
  userToken: z.string(),
});

export type MyAccountProps = z.infer<typeof MyAccountPropsSchema>;

const MyAccount: FC<MyAccountProps> = ({ responseData, error, myCookie }) =>
{
  const [cookie] = useCookies(['userToken']);
  const [fetchCheckLoggedIn, { data }] = useFetchCheckLoggedInMutation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() =>
  {
    if ("userToken" in cookie)
    {
      fetchCheckLoggedIn(cookie.userToken);
      if (data && data.data.status === 200)
      {
        setIsLoggedIn(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookie, isLoggedIn])

  const pageTitle = "My-account";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <Breadcrumbs links={[
        { name: 'my-account', url: '/my-account' },
      ]} />
      <main>
        <h1>{pageTitle}</h1>
        {!isLoggedIn &&
          <LoginForm />
        }
      </main>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context) =>
{
  const { req } = context;
  const cookies = parse(req.headers.cookie || '');
  const yourCookieValue = cookies.userToken;

  try
  {
    const response = await axios(`${process.env.JWT_URL}validate`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourCookieValue}`
        },
        method: 'POST',
      }
    )
    const responseData = response.data;

    return {
      props: {
        myCookie: yourCookieValue || null,
        responseData: responseData ? responseData : null
      },
    };
  } catch (error)
  {
    console.error('Error fetching data:', error);
    return {
      props: {
        myCookie: yourCookieValue || null,
        error: error.message
      },
    };
  }
};

export default MyAccount;
