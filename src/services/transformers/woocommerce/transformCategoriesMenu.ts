import { Category, Subcategory } from "@/types";

const transformResponse = (response: any[]): Category[] => {
    const categories: Category[] = [];

    response.forEach(parentRow => {
        if (parentRow.parent) return;
        if (parentRow.slug === 'uncategorized') return;

        const subcategories: Subcategory[] = [];
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