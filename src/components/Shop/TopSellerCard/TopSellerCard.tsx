import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Image from "next/image";
import { Box, styled, Typography } from "@mui/material";
import { typeProductType } from "@/types/Shop";
import formatPrice from "@/Utils/formatPrice";
import Link from "next/link";
import variables from "@/styles/variables.module.scss";
import { TopSellerCardSkeleton } from "./TopSellerCardSkeleton";

const CustomSwiper = styled(Swiper)`
  border-radius: 10px;
  background-color: #fff;

  .swiper-pagination-bullet {
        border-radius: 10px;
        width: 34px;
        height: 5px;
        background-color: ${variables.techBg};
    }
`;

const boxStyle = {
    display: "flex",
    padding: '40px 20px',
    alignItems: "center",
    textDecoration: "auto",
    color: "unset",
};

const imageBoxStyle = {
    width: '100%',
    height: '100%'
};


interface TopSellerCardProps
{
    products: typeProductType[] | null,
    isLoading?: boolean
}

export const TopSellerCard: FC<TopSellerCardProps> = ({ products, isLoading }) =>
{
    if (isLoading) return <TopSellerCardSkeleton />

    return (
        <CustomSwiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
        >
            {
                products && products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <Link style={boxStyle} href={`/product/${product.slug}`}>
                            <Box width={"50%"}
                                textAlign={"center"}
                            >
                                <Typography
                                    component={"h3"}
                                    className="sub-title"
                                    style={{
                                        textTransform: 'uppercase',
                                        color: variables.textGray,
                                        marginBottom: '30px'
                                    }}
                                >
                                    {product.name}
                                </Typography>
                                {typeof product.price === 'number' &&
                                    <p className={"product-price"}>
                                        Od {formatPrice(product.price)}
                                        &nbsp;<span className={"product-price-ending"}>Bez VAT</span>
                                    </p>
                                }
                            </Box>
                            <Box width={"50%"}
                                position={'relative'}
                            >
                                <Box sx={imageBoxStyle}>
                                    <div style={{
                                        width: '100%',
                                        minHeight: '250px',
                                        position: 'relative',
                                    }}>
                                        <Image
                                            src={product.images[0].src}
                                            alt={product.name}
                                            objectFit="contain"
                                            fill
                                            sizes="min-height: 250px"
                                            unoptimized={true}
                                        />
                                    </div>
                                </Box>
                            </Box>
                        </Link >
                    </SwiperSlide>
                ))
            }
        </CustomSwiper >
    )
}
