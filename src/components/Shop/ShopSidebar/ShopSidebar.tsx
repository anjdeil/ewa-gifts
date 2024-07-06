import React, { FC } from 'react';
import FilterCollapsed from './Filters/FilterCollapsed';
import { useFetchAttributeTermsQuery } from '@/store/custom/customApi';
import { useParams, useSearchParams } from 'next/navigation';
import PriceFilter from './Filters/PriceFilter';
import SubcategoriesList from './SubcategoriesList';
import ColorsFilter from './Filters/ColorsFilter';
import { useFetchCategoryListQuery } from '@/store/custom/customApi';
import { CategoryType } from '@/types/Services/customApi/Category/CategoryType';
import { useRouter } from 'next/router';

interface ShopSidebarPropsType {
    priceRange: {
        min: number,
        max: number
    }
}

const ShopSidebar: FC<ShopSidebarPropsType> = ({ priceRange }) => {
    const { slugs } = useParams();
    const [categorySlug, subcategorySlug] = slugs as string[];
    const router = useRouter();
    const searchParams = useSearchParams();

    /**
     * Categories
     */
    const { data: categoriesData } = useFetchCategoryListQuery({});
    const categories = categoriesData?.data && categoriesData.data.items as CategoryType[];
    const currentCategory = categories?.find((category: CategoryType) => category.slug === categorySlug);

    /**
     * Colors
     */
    const { data: colorsData } = useFetchAttributeTermsQuery('base_color');
    const colors = colorsData?.data && colorsData.data.items;
    const currentColor = searchParams.get('attribute_term');

    const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { slugs, ...params } = router.query;
        if (!Array.isArray(slugs)) return;

        const newSlugs = slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug));

        router.push({
            pathname: router.pathname,
            query: {
                slugs: newSlugs,
                ...params,
                attribute: 'pa_base_color',
                attribute_term: event.target.value,
            }
        })

    };

    const resetColor = () => {
        const { slugs, attribute, attribute_term, ...params } = router.query;
        if (!Array.isArray(slugs)) return;

        const newSlugs = slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug));

        if (attribute || attribute_term) router.push({
            pathname: router.pathname,
            query: {
                slugs: newSlugs,
                ...params
            },
        })
    }

    return (
        <>
            <FilterCollapsed title={currentCategory?.name} collapsed={false}>
                <SubcategoriesList categories={categories} parent={currentCategory} currentSubcategorySlug={subcategorySlug} />
            </FilterCollapsed>

            <FilterCollapsed title={"Cena"} collapsed={false}>
                <PriceFilter priceRange={priceRange} />
            </FilterCollapsed>

            <FilterCollapsed title={"Kolor"} collapsed={false}>
                <ColorsFilter colors={colors} currentColor={currentColor} onChangeColor={handleChangeColor} onReset={() => resetColor()} />
            </FilterCollapsed>
        </>
    )
}

export default ShopSidebar;