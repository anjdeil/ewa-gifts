import { RegistrationForm } from "@/components/Forms/RegistrationForm";
import { PageHeader } from "@/components/Layouts/PageHeader";
import { Section } from "@/components/Layouts/Section";
import parseCookies from "@/Utils/parseCookies";
import { Box } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FC } from "react";
// import { GetServerSidePropsContext } from 'next';
const breadLinks = [{ name: 'Składania zamowienia', url: '/checkout' }];

const Checkout: FC = ({ response }) =>
{
    const pageTitle = 'Składania zamowienia';
    if (response)
    {
        console.dir(response);
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

async function checkUserTokenInServerSide(destination: string, context: GetServerSidePropsContext, cookieName: string)
{
    const cookies = context.req.headers.cookie;
    if (!cookies)
    {
        return {
            redirect: {
                destination: destination,
                permanent: false,
            },
        };
    }

    const cookieRows = parseCookies(cookies);
    if (!(cookieName in cookieRows))
    {
        return {
            redirect: {
                destination: destination,
                permanent: false,
            },
        };
    }

    try
    {
        const userResponse = await axios.get(`${process.env.SITE_URL}/wp-json/wp/v2/users/me`, {
            headers: {
                'Authorization': `Bearer ${cookieRows[cookieName]}`,
            },
        });

        const userData = userResponse.data;
        if (userData)
        {
            return userData;
        }
        // if (!userData?.id)
        // {
        //     return {
        //         redirect: {
        //             destination: destination,
        //             permanent: false,
        //         },
        //     };
        // }

        // return { props: {} };

    } catch (err)
    {
        if (axios.isAxiosError(err))
        {
            const response = err.response as AxiosResponse;
            if (response?.data?.code === 'jwt_auth_invalid_token')
            {
                return {
                    redirect: {
                        destination: destination,
                        permanent: false,
                    },
                };
            }
        }

        return {
            notFound: true
        };
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => 
{
    const result = await checkUserTokenInServerSide('/', context, 'userToken');

    if ('redirect' in result)
    {
        return {
            props: {
                response: result
            }
        }
    }

    if (result.notFound)
    {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            response: result
        }
    }
}

export default Checkout;