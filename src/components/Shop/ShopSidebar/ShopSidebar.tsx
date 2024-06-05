import React from 'react';
import FilterCollapsed from './FilterCollapsed';
import { useFetchAllCategoriesListQuery, useFetchAttributeTermsQuery } from '@/store/wooCommerce/wooCommerceApi';
import transformCategoriesMenu from '@/services/transformers/woocommerce/transformCategoriesMenu';
import { useParams } from 'next/navigation';
import PriceFilter from './PriceFilter';
import SubcategoriesList from './SubcategoriesList';
import { Box, FormControlLabel } from '@mui/material';
import BpCheckbox from '@/components/EwaComponents/EwaCheckbox';
import EwaCheckbox from '@/components/EwaComponents/EwaCheckbox/EwaCheckbox';

const ShopSidebar = () => {
    const { slugs } = useParams();
    const [categorySlug, subcategorySlug] = slugs;

    const { data: categoriesData = [], isLoading: isCategoriesLoading, isError: isCategoriesError, error: categoriesError } = useFetchAllCategoriesListQuery();
    const categories = categoriesData.length ? transformCategoriesMenu(categoriesData) : [];

    const { data: termsData = [], isLoading: isTermsLoading, isError: isTermsError, error: termsError } = useFetchAttributeTermsQuery(11);
    const suppliers = termsData.length ? termsData : [];
    console.log(suppliers);


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
                {suppliers.length && suppliers.map(supplier => (
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita, repellendus ut explicabo numquam incidunt atque necessitatibus perspiciatis, aperiam accusamus doloremque adipisci officiis nihil sapiente porro ea? Perferendis voluptates earum rerum.
            </FilterCollapsed>
        </>
    )
}

export default ShopSidebar;