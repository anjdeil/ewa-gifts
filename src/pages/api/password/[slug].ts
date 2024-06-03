import { validateApiError } from '@/Utils/validateApiError';
import passwordReset from '@/services/passwordReset/passwordResetApi';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { slug } = req.query;
    console.log(slug)

    if (!slug || slug.length === 0)
    {
        return res.status(400).json({ error: 'Slug parameter is missing' });
    }

    passwordReset.post(slug, req.body)
        .then((response) => res.status(200).json(response.data))
        .catch((error) =>
        {
            validateApiError(error, res);
        })
}