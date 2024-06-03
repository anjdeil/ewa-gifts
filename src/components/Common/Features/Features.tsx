import { FeaturesProps } from "@/types";
import * as React from 'react';
import styles from './styles.module.scss';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/grid';
import { Grid } from 'swiper/modules';
import { useMediaQuery } from "@mui/material";

const Item: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => <div {...props} />;

export const Features: React.FC<FeaturesProps> = ({ features }) =>
{
    const isMobile = useMediaQuery('(max-width: 1024px)');
    return (
        <Swiper
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
            }}
            grid={{
                rows: 1,
            }}
            modules={[Grid]}
        >
            {features.map((feature, index) => (
                <SwiperSlide key={index}>
                    <Item className={`${styles.features__text} sub-title`} >
                        <Image
                            src={feature.image}
                            alt={feature.text}
                            width={isMobile ? 24 : 48}
                            height={isMobile ? 24 : 48}
                        />
                        {feature.text}
                    </Item>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}