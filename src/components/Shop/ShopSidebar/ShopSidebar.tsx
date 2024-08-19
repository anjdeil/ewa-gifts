import React, { FC, useEffect, useState } from 'react';
import FilterCollapsed from './Filters/FilterCollapsed';
import { useParams, useSearchParams } from 'next/navigation';
import PriceFilter from './Filters/PriceFilter';
import SubcategoriesList from './SubcategoriesList';
import ColorsFilter from './Filters/ColorsFilter';
import { useFetchCategoryListQuery } from '@/store/custom/customApi';
import { CategoryType } from '@/types/Services/customApi/Category/CategoryType';
import { useRouter } from 'next/router';
import { StatisticAttributeType } from '@/types/Services/customApi/Attribute/StatisticAttributeType';

type PriceRange = {
    min: number,
    max: number
}

interface ShopSidebarPropsType {
    availableAttributes: StatisticAttributeType[],
    priceRange: PriceRange
}

const ShopSidebar: FC<ShopSidebarPropsType> = ({ priceRange, availableAttributes }) => {
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
    const colorAttribute = availableAttributes.find(({ slug }) => slug === "base_color");
    const colors = colorAttribute?.options;
    const currentColor = searchParams.get('attribute') === "pa_base_color" ? searchParams.get('attribute_term') : null;

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

    /**
     * Prices
     */
    const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || String(priceRange.min));
    const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || String(priceRange.max));

    useEffect(() => {
        setMinPrice(searchParams.get('min_price') || String(priceRange.min));
        setMaxPrice(searchParams.get('max_price') || String(priceRange.max));
    }, [priceRange, searchParams])

    const onChangePriceRange = (changedPriceRange: PriceRange) => {
        if (changedPriceRange.min !== +minPrice) {
            setMinPrice(String(changedPriceRange.min));
        }
        if (changedPriceRange.max !== +maxPrice) {
            setMaxPrice(String(changedPriceRange.max));
        }
    }

    useEffect(() => {
        const { slugs, min_price, max_price, ...params } = router.query;
        if (!Array.isArray(slugs)) return;

        type PriceParams = {
            min_price?: string,
            max_price?: string
        }
        const newPriceParams: PriceParams = {};

        if (+minPrice !== priceRange.min) {
            newPriceParams.min_price = minPrice;
        }

        if (+maxPrice !== priceRange.max) {
            newPriceParams.max_price = maxPrice;
        }

        if ((newPriceParams?.min_price !== min_price) ||
            (newPriceParams?.max_price !== max_price)) {
            const newSlugs = slugs.filter(slug => slug !== 'page' && Number.isNaN(+slug));

            router.push({
                pathname: router.pathname,
                query: {
                    slugs: newSlugs,
                    ...params,
                    ...newPriceParams
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minPrice, maxPrice]);

    return (
        <>
            {currentCategory && (
                <FilterCollapsed title={currentCategory?.name} collapsed={false}>
                    <SubcategoriesList categories={categories} parent={currentCategory} currentSubcategorySlug={subcategorySlug} />
                </FilterCollapsed>
            )}

            <FilterCollapsed title={"Cena"} collapsed={false}>
                <PriceFilter
                    onChange={onChangePriceRange}
                    priceRange={priceRange}
                    currentRange={{
                        min: +minPrice,
                        max: +maxPrice,
                    }}
                />
            </FilterCollapsed>

            {Array.isArray(colors) && colors.length &&
                <FilterCollapsed title={"Kolor"} collapsed={false}>
                    <ColorsFilter colors={colors} currentColor={currentColor} onChangeColor={handleChangeColor} onReset={() => resetColor()} />
                </FilterCollapsed>
            }
        </>
    )
}

export default ShopSidebar;