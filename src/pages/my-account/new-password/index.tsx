import Head from "next/head";
import { z } from "zod";
import { FC } from "react";
import styles from "@/components/MyAccount/styles.module.scss";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { NewPassword } from "@/components/Forms/NewPassword";

export const MyAccountPropsSchema = z.object({
    userToken: z.string(),
});

export type MyAccountProps = z.infer<typeof MyAccountPropsSchema>;

const MyAccount: FC<MyAccountProps> = () => {
    return (
        <>
            <Head>
                <title>Nowe hasło</title>
            </Head>
            <main className={styles['my-account']}>
                <div className="container">
                    <div className="page-top page-top_center">
                        <Breadcrumbs links={[
                            { name: 'Moje konto', url: '/my-account' },
                            { name: 'Nowe hasło', url: '/my-account/new-password' }
                        ]} />
                        <div className="page-top__titling">
                            <h1 className="page-top__title">Nowe hasło</h1>
                        </div>
                    </div>
                    <div className={`${styles['my-account__container']} ${styles['my-account__container_simple']}`}>
                        <NewPassword />
                    </div>
                </div>
            </main>
        </>
    );
};

export default MyAccount;
