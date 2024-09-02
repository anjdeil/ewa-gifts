import { customRestApi } from "@/services/CustomRestApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { path, ...params } = req.query;

    if (!path?.length)
        return res.status(400).json({ error: 'Failed to fetch, because slug is missing!' });

    const { method, body } = req;
    let response;
    const slug = typeof path === 'string' ? path : path.join('/');

    try
    {
        switch (method)
        {
            case 'GET':
                response = await customRestApi.get(slug, params);
                break;
            case 'POST':
                response = await customRestApi.post(slug, body);
                break;
            default:
                res.setHeader('Allow', ['POST', 'GET']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }

        if (response && response.data)
            return res.status(200).json(response?.data);

    } catch (error)
    {
        console.error("Error during request:", error);
        return res.status(500).json(response);
    }
}