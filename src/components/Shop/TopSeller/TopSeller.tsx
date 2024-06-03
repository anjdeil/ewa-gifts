import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useFetchProductListQuery } from "@/store/wooCommerce/wooCommerceApi";
import { transformProductCard } from "@/services/transformers";
import { RichTextComponent } from "@/components/Common/RichTextComponent";

const swiperStyle = {
    borderRadius: '10px',
    backgroundColor: '#fff'
};

const boxStyle = {
    display: "flex",
    padding: '40px 20px',
    alignItems: "center"
};

const imageBoxStyle = {
    width: '100%',
    height: '100%'
};

export const TopSeller: FC = () => {
    const { data, isError } = useFetchProductListQuery({ per_page: 10 });

    if (!data) {
        return <div>Products not found.</div>
    }

    let products;

    if (data) {
        products = transformProductCard(data);

    }

    if (isError) {
        return <h3>Products not found.</h3>
    }

    return (
        <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            style={swiperStyle}
            className="top-product-slider"
        >
            {
                products && products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <Box style={boxStyle}>
                            <Box width={"50%"}
                                textAlign={"center"}
                            >
                                <Typography
                                    component={"h3"}
                                    className="sub-title"
                                    sx={{
                                        textTransform: 'uppercase',
                                        opacity: 0.5,
                                        marginBottom: '30px'
                                    }}
                                >
                                    {product.name}
                                </Typography>
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
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            sizes="min-height: 250px"
                                        />
                                    </div>
                                </Box>
                            </Box>
                        </Box >
                    </SwiperSlide>
                ))
            }
        </Swiper >
    )
}
