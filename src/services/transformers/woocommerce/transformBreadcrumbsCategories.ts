import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";
import { BreadcrumbType } from "@/types/layouts/Breadcrumbs";

const transformBreadcrumbsCategories = (categories: CategoryType[]): BreadcrumbType[] => {
    return categories.reduce<BreadcrumbType[]>((prev, { name, slug }) => {
        const prevUrl = prev.length ? prev[0].url : '/product-category';
        return [...prev, { name, url: `${prevUrl}/${slug}` }];
    }, []);
}
export default transformBreadcrumbsCategories;