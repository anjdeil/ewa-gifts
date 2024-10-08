import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";

export function getCategoriesForUrl(categories: CategoryType[]): string
{
    if (!categories) return '';
    return categories.map(category => category.slug).join('/');
}