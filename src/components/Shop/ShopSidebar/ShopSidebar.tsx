import React from 'react';
import FilterCollapsed from './FilterCollapsed';
import { useFetchAllCategoriesListQuery, useFetchAttributeTermsQuery } from '@/store/wooCommerce/wooCommerceApi';
import transformCategoriesMenu from '@/services/transformers/woocommerce/transformCategoriesMenu';
import { useParams } from 'next/navigation';
import PriceFilter from './PriceFilter';
import SubcategoriesList from './SubcategoriesList';
import { Box, FormControlLabel } from '@mui/material';
import EwaCheckbox from '@/components/EwaComponents/EwaCheckbox/EwaCheckbox';
import { transformColors } from '@/services/transformers/woocommerce/transformColors';
import ColorsFilter from './ColorsFilter';

const ShopSidebar = () => {
    const { slugs } = useParams();
    const [categorySlug, subcategorySlug] = slugs;

    const { data: categoriesData = [], isLoading: isCategoriesLoading, isError: isCategoriesError, error: categoriesError } = useFetchAllCategoriesListQuery();
    const categories = categoriesData.length ? transformCategoriesMenu(categoriesData) : [];

    const { data: suppliersData = [], isLoading: isSuppliersLoading, isError: isSuppliersError, error: suppliersError } = useFetchAttributeTermsQuery(11);
    const suppliers = suppliersData.length ? suppliersData : [];

    const { data: colorsData = [], isLoading: isColorsLoading, isError: isColorsError, error: colorsError } = useFetchAttributeTermsQuery(9);
    const colors = colorsData.length ? transformColors(colorsData) : [];
    console.log(colorsData);
    console.log(colors);



    const targetCategory = categories.find(({ slug }) => slug === categorySlug);

    return (
        <>
            <FilterCollapsed title={targetCategory?.categoryName} collapsed={false}>
                <SubcategoriesList targetCategory={targetCategory} currentSubcategorySlug={subcategorySlug} />
            </FilterCollapsed>
            <FilterCollapsed title={"Price"} collapsed={false}>
                <PriceFilter />
            </FilterCollapsed>
            <FilterCollapsed title={"Suppliers"} collapsed={false}>
                {suppliers?.map(supplier => (
                    <Box key={supplier.id}>
                        <FormControlLabel
                            sx={{
                                '.MuiTypography-root': {
                                    fontSize: '0.9em',
                                }
                            }}
                            label={supplier.name}
                            value={supplier.id}
                            control={
                                <EwaCheckbox
                                    inputProps={{
                                        "aria-label": supplier.name,
                                    }}
                                />
                            }
                        />
                    </Box>
                ))}
            </FilterCollapsed>
            <FilterCollapsed title={"Colors"} collapsed={false}>
                <ColorsFilter colors={colors} />
            </FilterCollapsed>
        </>
    )
}

export default ShopSidebar;