import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import styles from './styles.module.scss';
import { ColorSliderProps } from "@/types";
import { Radio } from "@mui/material";
import { EwaColorPickCheckedIcon, EwaColorPickIcon } from "@/components/EwaComponents/EwaColorPickIcons";

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
                spaceBetween={4}
                slidesPerView={'auto'}
            >
                {colors && colors.map((color, index) =>
                {
                    const uniqueId = `color-radio-${index}`;
                    return (
                        <SwiperSlide
                            className={`${styles.colorSwiper__slide}`}
                            key={uniqueId}
                        >
                            <Radio
                                key={uniqueId}
                                onChange={() => onColorClick(uniqueId)}
                                checked={uniqueId === currentColor}
                                inputProps={{ 'aria-label': color.label }}
                                value={color.cssColor}
                                icon={<EwaColorPickIcon color={color.cssColor} />}
                                checkedIcon={< EwaColorPickCheckedIcon color={color.cssColor} />}
                            />
                        </SwiperSlide>
                    )
                }
                )}
            </Swiper>
            <div id={nextElId} className={`swiper-button-next ${styles.colorSwiper__nextBtn}`} />
            <div id={prevElId} className={`swiper-button-prev ${styles.colorSwiper__prevBtn}`} />
        </div >
    )
}