export const transformSearchBarProducts = (response) => {
    return response.map((product) => ({
        key: `p${product.id}`,
        name: product.name,
        type: "Product",
        slug: `product/${product.slug}`,
    }));
}