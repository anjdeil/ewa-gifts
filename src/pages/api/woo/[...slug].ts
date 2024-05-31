import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";

export default async function handler(req, res)
{

    const { slug: slugs, ...params } = req.query;
    const slug = slugs.join('/');

    if (!slug)
    {
        return res.status(400).json({ error: 'Failed to fetch, because slug is missing!' });
    }

    if (req.body)
    {
        try
        {
            const response = await wooCommerceRestApi.post(slug, req.body);
            console.log(params);
            res.status(200).json(response.data);
        } catch (error)
        {
            if (error.response)
            {
                console.error('API error:', error.response.data);
                res.status(error.response.status).json({
                    message: error.response.data.message || 'API Error',
                    details: error.response.data
                });
            } else if (error.request)
            {
                console.error('Network error:', error.request);
                res.status(503).json({ message: 'No response from server', details: error.request });
            } else
            {
                console.error('Unexpected error:', error.message);
                res.status(500).json({ message: 'Unexpected error', details: error.message });
            }
        }
    }


    try
    {
        const response = await wooCommerceRestApi.get(slug, params);
        console.log(params);

        res.status(200).json(response.data);
    } catch (error)
    {
        res.status(500).json(error.message);
    }
}