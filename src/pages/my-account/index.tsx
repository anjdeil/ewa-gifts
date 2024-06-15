import Head from "next/head";
import { useCookies } from 'react-cookie';
import { z } from "zod";
import { FC, useEffect } from "react";
import { useFetchCheckLoggedInMutation } from "@/store/jwt/jwtApi";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { useRouter } from "next/router";
import { Section } from "@/components/Layouts/Section";

export const MyAccountPropsSchema = z.object({
  userToken: z.string(),
});

export type MyAccountProps = z.infer<typeof MyAccountPropsSchema>;

const MyAccount: FC<MyAccountProps> = () =>
{
  const [cookie] = useCookies(['userToken']);
  const [fetchCheckLoggedIn, { data }] = useFetchCheckLoggedInMutation();
  const router = useRouter();
  const pageTitle = "My-account";

  useEffect(() =>
  {
    if ("userToken" in cookie)
    {
      fetchCheckLoggedIn(cookie.userToken);
      if (data && data.data.status !== 200)
      {
        router.push('/my-account/login');
      }
    } else
    {
      router.push('/my-account/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookie]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main style={{ minHeight: '100vh' }}>
        <Section className={"section"} isContainer={true}>
          <Breadcrumbs links={[
            { name: 'my-account', url: '/my-account' },
          ]} />
          <h1>{pageTitle}</h1>
        </Section>
      </main>
    </>
  );
};

export default MyAccount;
