import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Box } from '@mui/material';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from '@mui/material/styles';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const CustomSwiper = styled(Swiper)`
    .navSlide__img-wrapper {
        border: 1px solid transparent;
        border-radius: 10px;
        width: max-content;
        padding: 4px;
        max-width: 118px;
        max-height: 118px;
    }
    .swiper-slide-thumb-active .navSlide__img-wrapper {
        border-color: #FECB00;
    }
`;

const ProductSwiper = ({ data }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const swiperId = `swiper-1`;
    const nextElId = `${swiperId}-next`;
    const prevElId = `${swiperId}-prev`;

    return (
        <Box>
            <Swiper
                breakpoints={{
                    1340: {
                        slidesPerView: 1,
                    },
                }}
                spaceBetween={10}
                centeredSlides={true}
                navigation={{
                    nextEl: `#${nextElId}`,
                    prevEl: `#${prevElId}`,
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={`mySwiper2 ${styles.forNav}`}
                loop={true}
            >
                {data &&
                    data.map((item, index) => (
                        <SwiperSlide key={index} className={styles.slide}>
                            <Image src={item} alt={`Product image ${index + 1}`} width={630} height={630}  className={styles.slide__img}/>
                        </SwiperSlide>
                    ))}
                <div id={nextElId} className={`swiper-button-next ${styles.forNav__nextBtn}`} >
                    <Image src='/images/swiper-arrow.svg' alt={`arrow-next`} width={20} height={20} />
                </div>
                <div id={prevElId} className={`swiper-button-prev ${styles.forNav__prevBtn}`} >
                    <Image src='/images/swiper-arrow-prev.svg' alt={`arrow-prev`} width={20} height={20} />
                </div>
            </Swiper>
            <CustomSwiper
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    1340: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                }}
                onSwiper={(swiper) => {
                    if (!swiper.destroyed) {
                        setThumbsSwiper(swiper);
                    }
                }}
                spaceBetween={0}
                slidesPerView={'auto'}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={`mySwiper ${styles.nav}`}
                loop={true}
                centeredSlides={true}
            >
                {data &&
                    data.map((item, index) => (
                        <SwiperSlide key={index} className={styles.navSlide}>
                           <Box className='navSlide__img-wrapper'>
                               <Image src={item} alt={`Thumbnail image ${index + 1}`} width={110} height={110} className={styles.navSlide__img} />
                           </Box>
                        </SwiperSlide>
                    ))}
            </CustomSwiper>
        </Box>
    );
};

export default ProductSwiper;
