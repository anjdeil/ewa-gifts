export const transformSearchBarCategories = (response) => {
    const categories = response.map((category, i, categories) => ({
        key: `c${category.id}`,
        name: category.name,
        type: "Category",
        slug: category.parent ?
            `product-category/${category.slug}/${categories.find(({ id }) => id === category.parent)?.slug}`
            : category.slug,
        count: category.count
    }));

    const uncatIndex = categories.findIndex(({ slug }) => slug === 'uncategorized');
    categories.splice(uncatIndex, 1);

    return categories;
}