import React from 'react';
import FilterCollapsed from './FilterCollapsed';
import { useFetchAllCategoriesListQuery } from '@/store/wooCommerce/wooCommerceApi';
import transformCategoriesMenu from '@/services/transformers/woocommerce/transformCategoriesMenu';
import { useParams } from 'next/navigation';
import PriceFilter from './PriceFilter';
import SubcategoriesList from './SubcategoriesList';

const ShopSidebar = () => {
    const { slugs } = useParams();
    const [categorySlug, subcategorySlug] = slugs;

    const { data = [], isLoading, isError, error } = useFetchAllCategoriesListQuery();
    const categories = data.length ? transformCategoriesMenu(data) : [];

    const targetCategory = categories.find(({ slug }) => slug === categorySlug);

    return (
        <>
            <FilterCollapsed title={targetCategory?.categoryName} collapsed={false}>
                <SubcategoriesList targetCategory={targetCategory} currentSubcategorySlug={subcategorySlug} />
            </FilterCollapsed>
            <FilterCollapsed title={"Price"} collapsed={false}>
                <PriceFilter />
            </FilterCollapsed>
        </>
    )
}

export default ShopSidebar;