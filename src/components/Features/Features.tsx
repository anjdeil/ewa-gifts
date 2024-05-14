import { FeaturesType } from "@/types";
import * as React from 'react';
import styles from './Features.module.scss';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/grid';
import { Grid } from 'swiper/modules';


interface FeaturesProps
{
    data: FeaturesType[];
}

const Item: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => <div {...props} />;

export const Features: React.FC<FeaturesProps> = ({ data }) =>
{
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
            {data.map((item, index) => (
                <SwiperSlide key={index}>
                    <Item className={`${styles.features__text} sub-title`} >
                        <Image
                            src={item.image}
                            alt={item.text}
                            width={48}
                            height={48}
                        />
                        {item.text}
                    </Item>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}