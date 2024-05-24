import wpRestApi from "@/services/wordpress/WPRestAPI";
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { ...params } = req.query;
    let slug = req.query.path;

    if (!slug || slug.length === 0)
    {
        return res.status(400).json({ error: 'Slug parameter is missing' });
    }

    if (Array.isArray(slug))
    {
        slug = slug.join('/');
    }

    wpRestApi.get(slug, params)
        .then((response) => res.status(200).json(response.data))
        .catch((error) =>
        {
            return res.status(500).json(error.message);
        })
}