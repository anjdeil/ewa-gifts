import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { SliderProps } from "@/types";
import { useMediaQuery } from "@mui/material";
import { AdaptiveImage } from "@/components/Common/AdaptiveImage";
import Link from "next/link";
import { styled } from '@mui/material/styles';

const CustomSwiper = styled(Swiper)`
    .swiper-slide-active {
        opacity: 1;
    }
`;

export const Slider: FC<SliderProps> = ({ slides, height }) =>
{
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <div className="custom-swiper">
            <CustomSwiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                style={{
                    height: height,
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Link href={slide.url}>
                            <AdaptiveImage
                                isMobile={isMobile}
                                imageUrl={slide.image_desc}
                                mobileImageUrl={slide.image_mob}
                                alt={slide.text}
                                descOffset={'30%'}
                                mobOffset={'100%'}
                                objectFit={'cover'}
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </CustomSwiper>
        </div>
    );
};
