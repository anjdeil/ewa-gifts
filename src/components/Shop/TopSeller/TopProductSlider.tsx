// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Image from "next/image";
import { TopProductSliderType } from "@/types";
import { Box, Typography } from "@mui/material";

interface TopProductSliderProps {
    data: TopProductSliderType[]
}

const swiperStyle = {
    borderRadius: '10px'
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


export const TopProductSlider: FC<TopProductSliderProps> = ({ data }) => {
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
                data.map((item, index) => (
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
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component={"p"}
                                    className="desc"
                                >
                                    {item.desc}
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
                                            src={item.images.large.src}
                                            alt={item.images.large.alt}
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
