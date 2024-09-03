import wpRestApi from "@/services/wordpress/wpRestAPI";
import { validateApiError } from "@/Utils/validateApiError";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { ...params } = req.query;
    let slug = req.query.path;

    if (!slug || slug.length === 0)
        return res.status(400).json({ error: 'Slug parameter is missing' });

    if (Array.isArray(slug))
        slug = slug.join('/');

    const { method, body, headers } = req;
    const authorization = "authorization" in headers ? headers.authorization : null;
    let response;

    try {
        switch (method) {
            case 'GET':
                response = await wpRestApi.get(slug, params, authorization);
                break;
            case 'PUT':
                response = await wpRestApi.put(slug, body, authorization);
                break;
            default:
                res.setHeader('Allow', ['GET', 'PUT']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }

        if (response && response.data)
            return res.status(200).json(response?.data);

    } catch (error) {
        console.error(error);

        validateApiError(error, res);
    }
}