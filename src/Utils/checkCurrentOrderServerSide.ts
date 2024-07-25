import { GetServerSidePropsContext } from "next";
import parseCookies from "./parseCookies";
import axios from "axios";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";

export async function checkCurrentOrderServerSide(destination: string, context: GetServerSidePropsContext, cookieName: string)
{
    const redirect = {
        destination: destination,
        permanent: false,
    }

    const cookies = context.req.headers.cookie;
    if (!cookies) return { redirect: redirect };

    const cookieRows = parseCookies(cookies);
    if (!(cookieName in cookieRows)) return { redirect: redirect };

    try
    {
        const resp = await wooCommerceRestApi.get(`orders/${cookieRows[cookieName]}`);
        if (resp) return resp.data;
        else return { redirect: redirect };
    } catch (err)
    {
        if (axios.isAxiosError(err))
        {
            console.error(err.message);
            return { redirect: redirect };
        }
        return { notFound: true };
    }
}