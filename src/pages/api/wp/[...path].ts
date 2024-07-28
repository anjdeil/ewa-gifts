import wpRestApi from "@/services/wordpress/wpRestAPI";
import { validateApiError } from "@/Utils/validateApiError";
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { ...params } = req.query;
    const headers = req.headers;
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

    wpRestApi.get(slug, params, authorization)
        .then((response) => res.status(200).json(response.data))
        .catch((error) =>
        {
            validateApiError(error, res);
        })
}