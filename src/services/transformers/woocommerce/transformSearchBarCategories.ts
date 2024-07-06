import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";

export const transformSearchBarCategories = (response: CategoryType[]) => {
    const categories = response.map((category, i, categories) => ({
        key: `c${category.id}`,
        name: category.name,
        type: "Kategoria",
        slug: category.parent_id ?
            `product-category/${category.slug}/${categories.find(({ id }) => id === category.parent_id)?.slug}`
            : `product-category/${category.slug}`,
        count: category.count
    }));

    const uncatIndex = categories.findIndex(({ name }) => name === 'Uncategorized');
    categories.splice(uncatIndex, 1);

    return categories;
}