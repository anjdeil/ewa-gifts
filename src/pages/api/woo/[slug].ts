import wooCommerceRestApi from "@/services/wooCommerceRestApi";

export default async function handler(req, res)
{
    const { slug, ...params } = req.query;

    try
    {
        switch (slug)
        {
            case "products":
                const response = await wooCommerceRestApi.get('products', params);
                res.status(200).json(response.data);
                break;
            default:
                res.status(400).json({ error: `The endpoint "${slug}" does not exist.` });
                break;
        }
    } catch (error)
    {
        res.status(500).json(error.message);
    }
}