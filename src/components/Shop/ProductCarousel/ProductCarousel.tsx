import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { ProductCard } from "../ProductCard";
import { typeProductType } from "@/types";
import { useFetchProductListQuery } from "@/store/custom/customApi";


export const ProductCarousel: FC = () =>
{
    const { data, isLoading } = useFetchProductListQuery({})

    if (isLoading)
    {
        return <h3>Loading...</h3>
    }

    if (!data)
    {
        return <div>Products not found.</div>
    }

    let products;

    if (data)
    {
        products = data.data.items;
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
                products && products.map((product: typeProductType) => (
                    <SwiperSlide key={product.id} style={{ height: 'auto' }}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}