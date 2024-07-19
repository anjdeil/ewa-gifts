import Head from "next/head";
import { useCookies } from 'react-cookie';
import { z } from "zod";
import { FC, useEffect } from "react";
import { useFetchCheckLoggedInMutation } from "@/store/jwt/jwtApi";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { useRouter } from "next/router";
import { RegistrationForm } from "@/components/Forms/RegistrationForm";
import styles from "@/components/MyAccount/styles.module.scss";

export const MyAccountPropsSchema = z.object({
    userToken: z.string(),
});

export type MyAccountProps = z.infer<typeof MyAccountPropsSchema>;

const MyAccount: FC<MyAccountProps> = () => {
    const [cookie] = useCookies(['userToken']);
    const [fetchCheckLoggedIn, { data }] = useFetchCheckLoggedInMutation();
    const router = useRouter();

    useEffect(() => {
        if ("userToken" in cookie) {
            fetchCheckLoggedIn(cookie.userToken);
            if (data && data.data.status === 200) {
                router.push('/my-account');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookie]);
    return (
        <>
            <Head>
                <title>Zarejestruj się</title>
            </Head>
            <main className={styles['my-account']}>
                <div className="container">
                    <div className="page-top page-top_center">
                        <Breadcrumbs links={[
                            { name: 'Moje konto', url: '/my-account' },
                            { name: 'Zarejestruj się', url: '/my-account/registration' }
                        ]} />
                        <div className="page-top__titling">
                            <h1 className="page-top__title">Zarejestruj się</h1>
                        </div>
                    </div>
                    <div className={`${styles['my-account__container']} ${styles['my-account__container_simple']}`}>
                        <RegistrationForm />
                    </div>
                </div>
            </main>
        </>
    );
};

export default MyAccount;
