import wooCommerceRestApi from "@/services/wooCommerceRestApi";

async function fetchAllCategories(page = 1, categories = []) {
    try {
        const response = await wooCommerceRestApi.get("products/categories", { per_page: 100, page });
        const allCategories = categories.concat(response.data);

        if (response.data.length === 100) {
            return fetchAllCategories(page + 1, allCategories);
        }

        return allCategories;
    } catch (error) {
        throw error;
    }
}

export default async function handler(req, res) {
    const { slug, ...params } = req.query;

    try {
        switch (slug) {
            case "products": {
                const response = await wooCommerceRestApi.get('products', params);
                res.status(200).json(response.data);
                break;
            }
            case "categories": {
                const categories = await fetchAllCategories();
                res.status(200).json(categories);
                break;
            }
            default: {
                res.status(400).json({ error: `The endpoint "${slug}" does not exist.` });
                break;
            }
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

