import { customRestApi } from "@/services/CustomRestApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{

    const { path, ...params } = req.query;

    if (!path?.length)
    {
        return res.status(400).json({ error: 'Failed to fetch, because slug is missing!' });
    }

    const slug = typeof path === 'string' ? path : path.join('/');


    try
    {
        if (req.method === "POST")
        {
            const response = await customRestApi.post(slug, req.body);
            res.status(200).json(response?.data);
        } else
        {
            const response = await customRestApi.get(slug, params);
            res.status(200).json(response?.data);
        }
    } catch (error)
    {
        res.status(500);
    }
}