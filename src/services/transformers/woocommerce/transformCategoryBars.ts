const transformCategoryBars = (response) =>
{
    const categories = [];

    response.forEach(parentRow =>
    {
        if (parentRow.parent) return;

        if (parentRow.slug === "uncategorized") return;

        categories.push({
            id: parentRow.id,
            categoryName: parentRow.name,
            imageSrc: parentRow.image?.src,
            slug: parentRow.slug,
        });
    });

    return categories;
}

export default transformCategoryBars;