import { GetServerSidePropsContext } from "next";
import parseCookies from "./parseCookies";
import axios, { AxiosResponse } from "axios";

export async function checkUserTokenInServerSide(destination: string, context: GetServerSidePropsContext, cookieName: string)
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
        const userResponse = await axios.get(`${process.env.SITE_URL}/wp-json/wp/v2/users/me`, {
            headers: {
                'Authorization': `Bearer ${cookieRows[cookieName]}`,
            },
        });

        const userData = userResponse.data;

        if (userData && userData.id)
        {
            return userData;
        }
        else
        {
            // context.res.setHeader('Set-Cookie', `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
            return { redirect: redirect };
        }

    } catch (err)
    {
        if (axios.isAxiosError(err))
        {
            const response = err.response as AxiosResponse;
            if (response?.data?.code === 'jwt_auth_invalid_token')
            {
                // context.res.setHeader('Set-Cookie', `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
                // return { redirect: redirect }
            }
        }
        // context.res.setHeader('Set-Cookie', `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
        return { redirect: redirect }
    }
}
