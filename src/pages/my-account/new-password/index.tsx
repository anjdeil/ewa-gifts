import Head from "next/head";
import { z } from "zod";
import { FC } from "react";
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { Section } from "@/components/Layouts/Section";
import { NewPassword } from "@/components/Forms/NewPassword";

export const MyAccountPropsSchema = z.object({
    userToken: z.string(),
});

export type MyAccountProps = z.infer<typeof MyAccountPropsSchema>;

const MyAccount: FC<MyAccountProps> = () =>
{
    const pageTitle = "New-password";
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
                        { name: 'new-password', url: '/my-account/new-password' }
                    ]} />
                    <h1>{pageTitle}</h1>
                    <NewPassword />
                </Section>

            </main>
        </>
    );
};

export default MyAccount;
