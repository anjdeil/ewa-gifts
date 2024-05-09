import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import Image from "next/image";

export const Slider: FC = () =>
{
    return (
        <div>
            <style jsx>{`
                .swiper-button-next::after {
                    content: url('/images/swiper-arrow.svg') !important;
                }
                
                .swiper-button-prev::after {
                    width: 40px;
                    content: url('/images/swiper-arrow-prev.svg') !important;
                }
                
                .swiper-button-next::after,
                .swiper-button-prev::after {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0!important;
                }
                
                .swiper-button-next,
                .swiper-button-prev {
                    width: 40px !important;
                    height: 40px !important;
                    background: #f5f5f5;
                    border-radius: 10px;
                }
                
                .swiper-button-next:active,
                .swiper-button-prev:active {
                    transition: .1s opacity ease-in-out;
                   opacity: 0.5;
                }
            `}</style>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                style={{
                    height: '500px',
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
