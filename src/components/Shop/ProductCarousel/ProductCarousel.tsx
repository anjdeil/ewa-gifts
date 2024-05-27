import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { ProductCard } from "../ProductCard";
import { productCarouselProps } from "@/types";
import { useFetchProductListQuery } from "@/store/wordpress";
import { transformProductCard } from "@/services/transformers";

export const ProductCarousel: FC<productCarouselProps> = ({ ids }) =>
{
    const { data } = useFetchProductListQuery({ include: ids });

    if (!data)
    {
        return <div>Products not found.</div>
    }

    let products;

    if (data)
    {
        products = transformProductCard(data);
    }

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
            {
                products && products.map((product, index) => (
                    <SwiperSlide key={index} style={{ height: 'auto' }}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}