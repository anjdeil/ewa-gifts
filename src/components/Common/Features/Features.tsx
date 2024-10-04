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
export const Features: React.FC<FeaturesProps> = ({ features, isCentered }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');

    const renderFeature = (feature: FeaturesProps['features'][0], index: number) => (
        <div className={styles.feature__el} key={index}>
            <Item className={`${styles.features__text} sub-title`}>
                <Image
                    src={feature.image}
                    alt={feature.text}
                    width={isMobile ? 50 : 48}
                    height={isMobile ? 50 : 48}
                    unoptimized
                />
                {feature.text}
            </Item>
        </div>
    );

    return isCentered ? (
        <div className={styles.featuresCentered}>
            <div className={styles.features__elements}>
                {features.map(renderFeature)}
            </div>
        </div>
    ) : (
        <Swiper
            loop
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
            }}
            grid={{ rows: 1 }}
            modules={[Grid]}
        >
            {features.map((feature, index) => (
                <SwiperSlide key={index}>
                    <Item className={`${styles.features__text} sub-title`}>
                        <Image
                            src={feature.image}
                            alt={feature.text}
                            width={isMobile ? 24 : 48}
                            height={isMobile ? 24 : 48}
                            unoptimized
                        />
                        {feature.text}
                    </Item>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};