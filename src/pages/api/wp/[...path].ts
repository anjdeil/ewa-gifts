import { validateApiError } from "@/Utils/validateApiError";
import wpRestApi from "@/services/WordPress/WPRestAPI";
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { ...params } = req.query;
    let slug = req.query.path;

    if (!slug || slug.length === 0) {
        return res.status(400).json({ error: 'Slug parameter is missing' });
    }

    if (Array.isArray(slug)) {
        slug = slug.join('/');
    }

    wpRestApi.get(slug, params)
        .then((response) => res.status(200).json(response.data))
        .catch((error) => {
            validateApiError(error, res);
        })
}