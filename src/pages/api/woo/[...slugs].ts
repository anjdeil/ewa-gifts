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

    if (req.body)
    {
        try
        {
            let response;
            const { method, body } = req;

            switch (method)
            {
                case 'POST':
                    response = await wooCommerceRestApi.post(slug, body);
                    break;
                case 'PUT':
                    response = await wooCommerceRestApi.put(slug, body);
                    break;
                default:
                    res.setHeader('Allow', ['POST', 'PUT']);
                    return res.status(405).end(`Method ${method} Not Allowed`);
            }
            res.status(200).json(response.data);
        } catch (error)
        {
            validateApiError(error, res);
        }
    }

    try
    {
        const response = await wooCommerceRestApi.get(slug, params);
        res.status(200).json(response.data);
    } catch (error)
    {
        validateApiError(error, res);
    }
}