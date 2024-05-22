import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { ProductCard } from "../ProductCard";
import { ProductSliderType } from "@/types";

export const ProductSlider: FC<ProductSliderType> = ({ isError, isLoading, products }) =>
{
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>We cannot get the products</p>;

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
                    <SwiperSlide key={index}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}