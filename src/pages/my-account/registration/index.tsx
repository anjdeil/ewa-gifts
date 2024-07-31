import Head from "next/head";
import { useCookies } from 'react-cookie';
import { z } from "zod";
import { FC, useEffect } from "react";
import { useFetchCheckLoggedInMutation } from "@/store/jwt/jwtApi";
import { useRouter } from "next/router";
import styles from "@/components/MyAccount/styles.module.scss";
import { RegistrationForm } from "@/components/Forms/RegistrationForm";
import { checkUserTokenInServerSide } from "@/Utils/checkUserTokenInServerSide";
// import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PageHeader } from "@/components/Layouts/PageHeader";
import { Section } from "@/components/Layouts/Section";

export const MyAccountPropsSchema = z.object({
    userToken: z.string(),
});

export type MyAccountProps = z.infer<typeof MyAccountPropsSchema>;

const pageTitle = "Zarejestruj się";
const breadLinks = [
    { name: 'Moje konto', url: '/my-account' },
    { name: 'Zarejestruj się', url: '/my-account/registration' }
]

const MyAccount: FC<MyAccountProps> = () =>
{
    const [cookie, _, removeCookie] = useCookies(['userToken']);
    const [fetchCheckLoggedIn, { data }] = useFetchCheckLoggedInMutation();
    const router = useRouter();

    useEffect(() =>
    {
        if ("userToken" in cookie)
        {
            const data = fetchCheckLoggedIn(cookie.userToken);
            if (data) console.log(data);
            // if (data && data.data.status === 200)
            //     router.push("/my-account");
            // else
            //     removeCookie('userToken');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookie]);
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            <main className={styles['my-account']}>
                <Section className={""} isBreadcrumbs={true} isContainer={true}>
                    <PageHeader title={pageTitle} breadLinks={breadLinks} />
                    <RegistrationForm />
                </Section>
            </main>
        </>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const result = await checkUserTokenInServerSide('/my-account', context, 'userToken');

    if (result && result.id) return { redirect: { ...result.redirect } };
    return { props: { userData: result } };
}

export default MyAccount;