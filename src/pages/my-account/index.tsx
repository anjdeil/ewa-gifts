import Head from "next/head";
import { useCookies } from 'react-cookie';
import { LoginForm } from "@/components/Forms/LoginForm";
import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { useFetchCheckLoggedInMutation } from "@/store/jwt/jwtApi";
import { ProgressBar } from "@/components/Layouts/ProgressBar";

const MyAccountPropsSchema = z.object({
  userToken: z.string(),
});

type MyAccountPropsS = z.infer<typeof MyAccountPropsSchema>;

const MyAccount: FC<MyAccountPropsS> = () =>
{
  const [cookie] = useCookies(['userToken']);
  const [fetchCheckLoggedIn, { data, isLoading }] = useFetchCheckLoggedInMutation();
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
      <ProgressBar isLoading={isLoading} />
      <main>
        <h1>{pageTitle}</h1>
        <p>Welcome to the Home Page</p>
        {!isLoggedIn &&
          <LoginForm />
        }
      </main>
    </>
  );
};

export default MyAccount;
