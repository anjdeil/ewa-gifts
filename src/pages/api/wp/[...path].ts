import wpRestApi from "@/services/wordpress/wpRestAPI";
import { validateApiError } from "@/Utils/validateApiError";
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { ...params } = req.query;
    const authorization = "authorization" in headers ? headers.authorization : null;
    let slug = req.query.path;

    if (!slug || slug.length === 0)
    {
        return res.status(400).json({ error: 'Slug parameter is missing' });
    }

    if (Array.isArray(slug))
    {
        slug = slug.join('/');
    }

    const { method, body, headers } = req;
    try
    {
        if (method !== "GET")
        {
            wpRestApi.get(slug, params, headers)
        } else
        {
            wpRestApi.get(slug, params, body, headers)
        }
    } catch (error) 
    {
        validateApiError(error, res);
    }
}