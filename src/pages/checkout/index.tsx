import { RegistrationForm } from "@/components/Forms/RegistrationForm";
import { PageHeader } from "@/components/Layouts/PageHeader";
import { Section } from "@/components/Layouts/Section";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { checkUserTokenInServerSide } from "@/Utils/checkUserTokenInServerSide";
import { Box } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FC } from "react";
import { z } from "zod";
const breadLinks = [{ name: 'Składania zamowienia', url: '/checkout' }];

const CheckoutPropsSchema = z.object({
    userData: z.number().nullable()
})

type CheckoutProps = z.infer<typeof CheckoutPropsSchema>;

const Checkout: FC<CheckoutProps> = ({ userData }) =>
{
    const pageTitle = 'Składania zamowienia';
    if (userData)
    {
        console.dir(userData);
    }
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`${pageTitle} page`} />
            </Head>
            <main>
                <Section className={""} isBreadcrumbs={true} isContainer={true}>
                    <PageHeader title={pageTitle} breadLinks={breadLinks} />
                    <Box>
                        <RegistrationForm />
                    </Box>
                </Section>
            </main >
        </>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => 
{
    const result = await checkUserTokenInServerSide('/', context, 'userToken');
    let userData = null;
    if ('id' in result)
    {
        try
        {
            const resp = await wooCommerceRestApi.get('customers/1');
            userData = resp.data;
        } catch (err)
        {
            if (err instanceof Error)
            {
                userData = { error: err.message };
            } else
            {
                userData = { error: 'Unknown error' };
            }
        }
    }

    // if ('redirect' in result)
    // {
    //     return {
    //         redirect: {
    //             ...result.redirect
    //         },
    //     }
    // }
    if ('redirect' in result) return { props: { userData: userData } };
    if (result.notFound) return { notFound: true };

    return { props: { userData: userData } };
}

export default Checkout;