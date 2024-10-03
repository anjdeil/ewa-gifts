import Head from "next/head";
import { useCookies } from 'react-cookie';
import { z } from "zod";
import { FC, useEffect } from "react";
import { useFetchCheckLoggedInMutation } from "@/store/jwt/jwtApi";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { useRouter } from "next/router";
import { LoginForm } from "@/components/Forms/LoginForm";
import styles from "@/components/MyAccount/styles.module.scss";
import { checkUserTokenInServerSide } from "@/Utils/checkUserTokenInServerSide";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const MyAccountPropsSchema = z.object({
    userToken: z.string(),
});

export type MyAccountProps = z.infer<typeof MyAccountPropsSchema>;

const MyAccount: FC<MyAccountProps> = () =>
{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, _, removeCookie] = useCookies(['userToken']);
    const [fetchCheckLoggedIn, { data }] = useFetchCheckLoggedInMutation();
    const router = useRouter();

    useEffect(() =>
    {
        if ("userToken" in cookie) { fetchCheckLoggedIn(cookie.userToken); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookie]);

    useEffect(() =>
    {
        if (data && data.data.status === 200)
            router.push("/my-account");
        else
            removeCookie('userToken');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <>
            <Head>
                <title>Logowanie</title>
            </Head>
            <main className={styles['my-account']}>
                <div className="container">
                    <div className="page-top page-top_center">
                        <Breadcrumbs links={[
                            { name: 'Moje konto', url: '/my-account' },
                            { name: 'Logowanie', url: '/my-account/login' }
                        ]} />
                        <div className="page-top__titling">
                            <h1 className="page-top__title">Logowanie</h1>
                        </div>
                    </div>
                    <div className={`${styles['my-account__container']} ${styles['my-account__container_simple']}`}>
                        <LoginForm />
                    </div>
                </div>
            </main>
        </>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const result = await checkUserTokenInServerSide('/my-account', context, 'userToken');

    if (result && result.id) return { redirect: { destination: "/my-account", permanent: false, } };
    return { props: { userData: result } };
}

export default MyAccount;
