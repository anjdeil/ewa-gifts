import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { ProductCard, ProductCardSkeleton } from "../ProductCard";
import { typeProductType } from "@/types/Shop";
import { useFetchProductListQuery } from "@/store/custom/customApi";
import Notification from "@/components/Layouts/Notification";

interface ProductCarousel
{
    ids?: string
}

export const ProductCarousel: FC<ProductCarousel> = ({ ids }) =>
{
    const { data, error, isError } = useFetchProductListQuery({ include: ids });
    const [products, setProducts] = useState<[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [customError, setCustomError] = useState<boolean | string>(false);
    const skeletonSlides = products ? products.length : 4;
    useEffect(() =>
    {
        if (data && data.data.items.length > 0)
        {
            setLoading(false);
            setProducts(data.data.items);
        }

        if (data && data.data.items.length === 0) { setCustomError("Products not found"); }

        if ((isError || !data) && !isLoading)
        {
            console.error(error);
            setLoading(false);
            setCustomError("Server Error");
        }
    }, [data, isError, error, isLoading])

    if (customError) return <Notification><div>{customError}</div></Notification>

    return (
        <Swiper
            spaceBetween={30}
            breakpoints={{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1240: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                1340: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            }}
        >
            {isLoading && Array.from({ length: skeletonSlides }).map((_, index) => (
                <SwiperSlide key={index} style={{ height: 'auto', display: 'flex', alignItems: 'stretch' }}>
                    <ProductCardSkeleton />
                </SwiperSlide>
            ))}

            {products && products.map((product: typeProductType) => (
                <SwiperSlide key={product.id} style={{ height: 'auto', display: 'flex', alignItems: 'stretch' }}>
                    <ProductCard product={product} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}