import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { ProductCard, ProductCardSkeleton } from "../ProductCard";
import { typeProductType } from "@/types";
import { useFetchProductListQuery } from "@/store/custom/customApi";
import Notification from "@/components/Layouts/Notification";


export const ProductCarousel: FC = ({ ids }) =>
{
    const { data, error, isError } = useFetchProductListQuery({ include: ['12312', '213123'] });
    const [products, setProducts] = useState<[] | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [customError, setCustomError] = useState<boolean | string>(false);
    const skeletonSlides = products ? products.length : 4;
    useEffect(() =>
    {
        if (data && data.data.items.length > 0)
        {
            setLoading(false);
            console.log('Products', data);
            setProducts(data.data.items);
        } else
        {
            setLoading(true);
        }

        if (data) console.log(data);

        if (isError)
        {
            console.error(error);
            setLoading(false);
            setCustomError("Server Error");
        }
    }, [data, isError, error])

    if (customError) return <Notification><div>{customError}</div></Notification>

    return (
        <Swiper
            spaceBetween={30}
            breakpoints={{
                320: {
                    slidesPerView: 1,
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

            {(products && !isLoading) &&
                products.map((product: typeProductType) => (
                    <SwiperSlide key={product.id} style={{ height: 'auto', display: 'flex', alignItems: 'stretch' }}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}