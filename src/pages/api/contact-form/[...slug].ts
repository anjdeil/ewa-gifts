import CF7RestApi from "@/services/contactForm7/ContactForm7RestApi";
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    let slug = req.query.path;

    if (!slug || slug.length === 0)
    {
        return res.status(400).json({ error: 'Slug parameter is missing' });
    }

    if (Array.isArray(slug))
    {
        slug = slug.join('/');
    }

    CF7RestApi.send(slug, req.body)
        .then((response) => res.status(200).json(response.data))
        .catch((error) =>
        {
            console.log(error.message)
            return res.status(500).json(error.message);
        })
}