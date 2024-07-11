import React, { FC } from "react";
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";
import SideList from "@/components/Layouts/SideList";

interface SubcategoriesListPropsType {
    categories?: CategoryType[],
    parent?: CategoryType,
    currentSubcategorySlug: string
}

const SubcategoriesList: FC<SubcategoriesListPropsType> = ({ categories, parent, currentSubcategorySlug }) => {

    const subcategories = categories?.filter(({ parent_id }) => parent_id === parent?.id);
    const subcategoriesLinks = subcategories?.map(({ name, slug }) => ({
        name,
        url: `/product-category/${parent?.slug}/${slug}`,
        imageUrl: `/images/categories/${slug}.svg`,
        isActive: slug === currentSubcategorySlug,
    }));

    if (subcategoriesLinks === undefined) return;

    return <SideList links={subcategoriesLinks} />;
}

export default SubcategoriesList;