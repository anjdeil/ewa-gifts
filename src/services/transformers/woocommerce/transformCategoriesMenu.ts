const transformResponse = (response) => {
    const categories = [];

    response.forEach(parentRow => {
        if (parentRow.parent) return;

        const subcategories = [];
        response.forEach(childRow => {
            if (childRow.parent !== parentRow.id) return;

            subcategories.push({
                id: childRow.id,
                categoryName: childRow.name,
                slug: childRow.slug
            });
        });

        categories.push({
            id: parentRow.id,
            categoryName: parentRow.name,
            slug: parentRow.slug,
            subcategories
        });
    });

    return categories;
}

export default transformResponse;