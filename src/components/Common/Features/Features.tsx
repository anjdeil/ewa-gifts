import { FeaturesProps } from "@/types/Common";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import * as React from 'react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import { Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.scss';

const Item: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => <div {...props} />;
// isCentered
export const Features: React.FC<FeaturesProps> = ({ features, isCentered }) => {
    const isCenteredClassName = isCentered && styles.featuresCentered;
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
                    <Item className={`${styles.features__text} ${isCenteredClassName} sub-title`} >
                        <Image
                            src={feature.image}
                            alt={feature.text}
                            width={isMobile ? 24 : 48}
                            height={isMobile ? 24 : 48}
                            unoptimized={true}
                        />
                        {feature.text}
                    </Item>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}