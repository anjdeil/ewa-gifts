import Head from "next/head";
import { z } from "zod";
import { FC } from "react";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { Section } from "@/components/Layouts/Section";
import { ResetPassword } from "@/components/Forms/ResetPassword";

export const MyAccountPropsSchema = z.object({
    userToken: z.string(),
});

export type MyAccountProps = z.infer<typeof MyAccountPropsSchema>;

const MyAccount: FC<MyAccountProps> = () =>
{
    const pageTitle = "Reset-password";
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
                <meta name="robots" content="noindex" />
            </Head>
            <main style={{ minHeight: '100vh' }}>
                <Section className={"section"} isContainer={true}>
                    <Breadcrumbs links={[
                        { name: 'my-account', url: '/my-account' },
                        { name: 'reset-password', url: '/my-account/reset-password' }
                    ]} />
                    <h1>{pageTitle}</h1>
                    <ResetPassword />
                </Section>

            </main>
        </>
    );
};

export default MyAccount;
