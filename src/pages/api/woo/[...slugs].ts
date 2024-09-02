import { validateApiError } from "@/Utils/validateApiError";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { slugs, ...params } = req.query;

    if (!slugs?.length)
    {
        return res.status(400).json({ error: 'Failed to fetch, because slug is missing!' });
    }

    const slug = typeof slugs === 'string' ? slugs : slugs.join('/');

    const { method, body, headers } = req;

    if (method !== "GET")
    {
        await fetchData(method, body, headers as Record<string, string>);
    } else
    {
        await fetchData(method);
    }

    async function fetchData(method: string = "GET", body?: unknown, headers?: Record<string, string>)
    {
        const maxRetries = 3;
        let attempt = 0;
        let response;

        while (attempt < maxRetries)
        {
            try
            {
                switch (method)
                {
                    case 'POST':
                        response = await wooCommerceRestApi.post(slug, body);
                        break;
                    case 'PUT':
                        response = await wooCommerceRestApi.put(slug, body);
                        break;
                    case 'DELETE':
                        response = await wooCommerceRestApi.delete(slug, headers);
                        break;
                    case 'GET':
                        response = await wooCommerceRestApi.get(slug, params);
                        break;
                    default:
                        console.error(`Default case with method ${method}`);
                        res.setHeader('Allow', ['POST', 'PUT', 'DELETE', 'GET']);
                        return res.status(405).end(`Method ${method} Not Allowed`);
                }

                if (response.status !== 400)
                {
                    return res.status(200).json(response.data);
                } else
                {
                    throw new Error(`Bad request: ${response.statusText}`);
                }
            } catch (error)
            {
                attempt++;
                if (attempt >= maxRetries)
                {
                    validateApiError(error, res);
                    break;
                }
            }
        }
    }
}