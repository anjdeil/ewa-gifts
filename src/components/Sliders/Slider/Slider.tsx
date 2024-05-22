import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import Image from "next/image";
import { SliderProps } from "@/types";

export const Slider: FC<SliderProps> = ({ data }) =>
{
    return (
        <div className="custom-swiper">
            <Swiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                style={{
                    height: '500px',
                    borderRadius: '10px'
                }}
            >
                <SwiperSlide key={1}>
                    <Image src={"/images/slide.jpg"} alt="Test" layout="fill" objectFit="cover" />
                </SwiperSlide>
                <SwiperSlide key={2}>
                    <Image src={"/images/slide.jpg"} alt="Test" layout="fill" objectFit="cover" />
                </SwiperSlide>
                <SwiperSlide key={3}>
                    <Image src={"/images/slide.jpg"} alt="Test" layout="fill" objectFit="cover" />
                </SwiperSlide>
                <SwiperSlide key={4}>
                    <Image src={"/images/slide.jpg"} alt="Test" layout="fill" objectFit="cover" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
