import { FC } from "react";
import AccountLayout from "@/components/MyAccount/AccountLayout";
import Notification from '@/components/Layouts/Notification';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import parseCookies from '@/Utils/parseCookies';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const redirectToLogin = {
    redirect: {
        destination: '/my-account/login',
        permanent: false,
    }
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const cookies = context.req.headers.cookie;
    if (!cookies) return redirectToLogin;

    const cookieRows = parseCookies(cookies)
    if (!cookieRows.userToken) return redirectToLogin;

    try {
        const userResponse = await axios.get(`${process.env.SITE_URL}/wp-json/wp/v2/users/me`, {
            headers: {
                'Authorization': `Bearer ${cookieRows.userToken}`
            }
        });

        const userData = userResponse.data;
        if (!userData?.id) return redirectToLogin;

        return {
            props: {
                userId: userData.id,
                userName: userData.name,
            }
        }

    } catch (error) {

        if (axios.isAxiosError(error)) {
            const response = error?.response as AxiosResponse;
            if (response?.data?.code === 'jwt_auth_invalid_token') return redirectToLogin;
        }

        return {
            notFound: true
        }
    }
}

interface MyAccountPropsType {
    userId: string,
    userName: string,
}

const MyAccount: FC<MyAccountPropsType> = ({ userName }) => {
    return (
        <AccountLayout title="Moje konto">
            <Notification>
                Witaj {userName}! Nie jesteś {userName}? <Link href={'/my-account/logout'}>Wyloguj się</Link>
            </Notification>
            <Notification>
                W ustawieniach swojego konta możesz przejrzeć swoje ostatnie zamówienia, zarządzać adresami płatności i dostawy oraz zmieniać hasło i szczegóły konta.
            </Notification>
        </AccountLayout>
    );
};

export default MyAccount;
