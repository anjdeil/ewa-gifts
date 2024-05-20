import wpRestApi from "@/services/wordpress/WPRestAPI";
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { slug, ...params } = req.query;

    if (!slug)
    {
        return res.status(400).json({ error: 'Slug parameter is missing' });
    }

    wpRestApi.get(slug, params)
        .then((response) => res.status(200).json(response.data))
        .catch((error) =>
        {
            return res.status(500).json(error.message);
        })
}