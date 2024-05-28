import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";

export default async function handler(req, res) {

    const { slug: slugs, ...params } = req.query;
    const slug = slugs.join('/');

    if (!slug) {
        return res.status(400).json({ error: 'Failed to fetch, because slug is missing!' });
    }

    try {
        const response = await wooCommerceRestApi.get(slug, params);
        console.log(params);

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(error.message);
    }
}