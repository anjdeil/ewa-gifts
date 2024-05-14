import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import styles from './styles.module.scss';

interface ColorSliderProps
{
    colors: string[] | null;
    onColorClick: (color: string) => void;
    currentColor: string;
}

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

export const ColorSlider: FC<ColorSliderProps> = ({ colors, onColorClick, currentColor }) =>
{
    return (
        <div style={{ position: 'relative', padding: '0 30px' }}>
            <Swiper
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {colors && colors.map((color: string, index) =>
                    <SwiperSlide
                        className={`
                        ${styles.colorSwiper__slide}
                        ${(currentColor === color) && styles.colorSwiper__color_active}
                        `}
                        key={color}
                        onClick={() => onColorClick(color)}
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
            <div className={`swiper-button-next ${styles.colorSwiper__nextBtn}`}></div>
            <div className={`swiper-button-prev ${styles.colorSwiper__prevBtn}`}></div>


        </div>
    )
}