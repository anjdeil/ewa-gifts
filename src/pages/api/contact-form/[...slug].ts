import CF7RestApi from "@/services/contactForm7/ContactForm7RestApi";
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { slug, body } = req.query;

    if (!slug)
    {
        return res.status(400).json({ error: 'Slug parameter is missing' });
    }

    const slugRes = slug.join('/');

    CF7RestApi.send(slugRes, req.body)
        .then((response) => res.status(200).json(response.data))
        .catch((error) =>
        {
            console.log(error.message)
            return res.status(500).json(error.message);
        })
}