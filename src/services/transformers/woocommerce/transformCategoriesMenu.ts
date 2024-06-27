import { Category, Subcategory } from "@/types";
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";

const transformResponse = (response: CategoryType[]): Category[] => {
    const categories: Category[] = [];

    response.forEach(parentRow => {
        if (parentRow.parent_id) return;
        if (parentRow.slug === 'uncategorized') return;

        const subcategories: Subcategory[] = [];
        response.forEach(childRow => {
            if (childRow.parent_id !== parentRow.id) return;

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