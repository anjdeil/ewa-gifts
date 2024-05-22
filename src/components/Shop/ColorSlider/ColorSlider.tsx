import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import styles from './styles.module.scss';
import { ColorSliderProps } from "@/types";

const colorsTemp = [
    '#aa1f00',
    '#ffefc2',
    '#2b2a29',
    '#80a7f7',
    '#426b1f',
    '#c2ffd7',
    '#c2ffd7',
    '#c2ffd7',
    '#c2ffd7',
]

export const ColorSlider: FC<ColorSliderProps> = ({ colors, onColorClick, currentColor, productId, className }) =>
{
    const swiperId = `swiper-${productId}`;
    const nextElId = `${swiperId}-next`;
    const prevElId = `${swiperId}-prev`;

    return (
        <div className={`${styles.colorSwiper} ${className}`}>
            <Swiper
                id={swiperId}
                navigation={{
                    nextEl: `#${nextElId}`,
                    prevEl: `#${prevElId}`,
                }}

                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {colors && colors.map((color, index) =>
                    <SwiperSlide
                        className={`
                        ${styles.colorSwiper__slide}
                        ${(currentColor === color) && styles.colorSwiper__color_active}
                        `}
                        key={color}
                        onClick={() => onColorClick(color, productId)}
                    >
                        <div
                            className={`
                            ${styles.colorSwiper__color}
                            ${(currentColor === color) && styles.colorSwiper__color_active}
                            `}
                            style={{
                                backgroundColor: `${colorsTemp[index]}`
                            }}>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <div id={nextElId} className={`swiper-button-next ${styles.colorSwiper__nextBtn}`} />
            <div id={prevElId} className={`swiper-button-prev ${styles.colorSwiper__prevBtn}`} />
        </div >
    )
}