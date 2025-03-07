import Notification from "@/components/Layouts/Notification";
import { useFetchProductListQuery } from "@/store/custom/customApi";
import { Box, useMediaQuery } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ProductCarousel } from "../ProductCarousel";
import { TopSellerCard } from "../TopSellerCard";

export const TopSeller: FC = () => {
    const { data, error, isError } = useFetchProductListQuery({ per_page: 3 });
    const [isLoading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<[] | null>(null);
    const [customError, setCustomError] = useState<boolean | string>(false);
    const isTable = useMediaQuery('(min-width:1024px)');

    useEffect(() => {
        if (data && data.data.items.length > 0) {
            setLoading(false);
            setProducts(data.data.items);
        }

        if (data && data.data.items.length === 0) { setCustomError("Products not found"); }

        if ((isError || !data) && !isLoading) {
            console.error(error);
            setLoading(false);
            setCustomError("Server Error");
        }
    }, [data, isError, error, isLoading]);

    if (customError) return <Notification><div>{customError}</div></Notification>

    return (
        <>
            <Box display={'flex'} gap={'20px'} marginBottom={'20px'} sx={{ flexDirection: 'row' }}>
                <TopSellerCard products={products} isLoading={isLoading} />
                {isTable && <TopSellerCard products={products} isLoading={isLoading} />}
            </Box>
            <ProductCarousel ids='235724, 235689, 235665, 235652' />
        </>
    )
}