import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import styles from './styles.module.scss';
import { ColorSliderProps } from "@/types";
import { useMediaQuery } from "@mui/material";

export const ColorSlider: FC<ColorSliderProps> = ({ colors, onColorClick, currentColor, productId, className }) => {
    const swiperId = `swiper-${productId}`;
    const nextElId = `${swiperId}-next`;
    const prevElId = `${swiperId}-prev`;
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const filteredColors = colors.map(color => {
        if (color.includes('#')) {
            return '#' + color.split('#')[1].split(')')[0];
        }
    });

    return (
        <div className={`${styles.colorSwiper} ${className}`}>
            <Swiper
                id={swiperId}
                navigation={{
                    nextEl: `#${nextElId}`,
                    prevEl: `#${prevElId}`,
                }}

                modules={[Navigation]}
                spaceBetween={isMobile ? 6 : 10}
                slidesPerView={6}
            >
                {colors[0] && colors.map((color, index) =>
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
                                backgroundColor: `${filteredColors[index]}`
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