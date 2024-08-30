import { customRestApi } from "@/services/CustomRestApi";
import { AxiosRequestHeaders } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { path, ...params } = req.query;

    if (!path?.length)
    {
        return res.status(400).json({ error: 'Failed to fetch, because slug is missing!' });
    }

    const slug = typeof path === 'string' ? path : path.join('/');

    const { method, body, headers } = req;
    let response;

    try
    {
        switch (method)
        {
            case 'POST':
                response = await customRestApi.post(slug, body, headers as AxiosRequestHeaders);
                break;
            case 'GET':
                response = await customRestApi.get(slug, params, headers as AxiosRequestHeaders);
                break;
            default:
                res.setHeader('Allow', ['POST', 'GET']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }

        if (response && response.data)
            res.status(200).json(response?.data);

    } catch (error)
    {
        res.status(500);
    }
}