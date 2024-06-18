import { validateApiError } from "@/Utils/validateApiError";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { slugs, ...params } = req.query;

    if (!slugs?.length) {
        return res.status(400).json({ error: 'Failed to fetch, because slug is missing!' });
    }

    const slug = typeof slugs === 'string' ? slugs : slugs.join('/');

    if (req.body) {
        try {
            const response = await wooCommerceRestApi.post(slug, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            validateApiError(error, res);
        }
    }

    try {
        const response = await wooCommerceRestApi.get(slug, params);
        console.log('Params', params);
        console.log('Slug', slug);

        res.status(200).json(response.data);
    } catch (error) {
        validateApiError(error, res);
    }
}