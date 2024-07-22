// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

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
import { useAppDispatch } from "@/hooks/redux";
import { popupSet } from "@/store/reducers/PopupSlice";
import { setData, setCurrentSlide } from "@/store/reducers/SwiperModal";
import { SwiperProps } from '@/types';

const CustomSwiperFor = styled(Swiper)`
	.swiper-button-prev.swiper-button-disabled,
	.swiper-button-next.swiper-button-disabled {
		opacity: 1;
		pointer-events: auto;
	}

	.swiper-button-disabled svg path {
		fill: #FECB00;
	}
`
const CustomSwiperNav = styled(Swiper)`
	.img-wrapper {
		border: 1px solid transparent;
		border-radius: 10px;
		padding: 6px;
		margin: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 118px;
		height: 118px;
	}

	@media screen and (max-width: 768px) {
		.img-wrapper {
			width: 80px;
			height: 80px;
		}
	}

	.swiper-slide-thumb-active .img-wrapper {
		border-color: #FECB00;
	}
`;

const ProductSwiper: React.FC<SwiperProps> = ({ data }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const dispatch = useAppDispatch();

    const swiperId = `swiper-2`;
    const nextElId = `${swiperId}-next`;
    const prevElId = `${swiperId}-prev`;

    const updateSwiperState = (images, slideNumber) => {
        dispatch(setData(images));
        dispatch(setCurrentSlide(slideNumber));
    };

    const handlerOpen = () => {
        updateSwiperState(data, activeSlide);
        dispatch(popupSet('swiper-popup'));
    };

    const handleSlideChange = (swiper) => {
        setActiveSlide(swiper.activeIndex);
    };

    return (
        <Box>
            <CustomSwiperFor
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
                onSlideChange={handleSlideChange}
            >
                {data &&
                    data.map((item, index) => (
                        <SwiperSlide key={item.id} className={styles.slide}>
                            <button type='button' className={styles.slide__btn} onClick={handlerOpen}>
                                <Image src={item.src} alt={`Product image ${index + 1}`} width={600} height={600}
                                    className={styles.slide__img} />
                            </button>
                        </SwiperSlide>
                    ))}
                <div id={nextElId} className={`swiper-button-next ${styles.forNav__nextBtn}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.14506 15.8765C9.11272 15.8374 9.08706 15.791 9.06956 15.7399C9.05206 15.6887 9.04305 15.634 9.04305 15.5786C9.04305 15.5233 9.05206 15.4685 9.06956 15.4174C9.08706 15.3663 9.11272 15.3198 9.14506 15.2807L14.8119 8.42099L0.347818 8.42099C0.255571 8.42099 0.167102 8.37663 0.101873 8.29767C0.0366441 8.21871 -8.19176e-07 8.11161 -7.94771e-07 7.99995C-7.70365e-07 7.88828 0.0366442 7.78119 0.101873 7.70223C0.167102 7.62327 0.255572 7.57891 0.347819 7.57891L14.8119 7.57891L9.14506 0.719155C9.11275 0.680036 9.08711 0.633595 9.06962 0.582484C9.05213 0.531373 9.04313 0.476593 9.04313 0.42127C9.04313 0.365948 9.05213 0.311168 9.06962 0.260057C9.08711 0.208945 9.11275 0.162505 9.14506 0.123386C9.17738 0.0842672 9.21574 0.0532366 9.25797 0.0320657C9.30019 0.0108949 9.34544 -1.4544e-06 9.39114 -1.44441e-06C9.43685 -1.43442e-06 9.4821 0.0108949 9.52432 0.0320658C9.56655 0.0532367 9.60491 0.0842673 9.63723 0.123386L15.898 7.70207C15.9303 7.74117 15.956 7.78761 15.9735 7.83872C15.991 7.88983 16 7.94462 16 7.99995C16 8.05528 15.991 8.11007 15.9735 8.16119C15.956 8.2123 15.9303 8.25873 15.898 8.29784L9.63722 15.8765C9.60492 15.9157 9.56656 15.9467 9.52433 15.9679C9.48211 15.9891 9.43685 16 9.39114 16C9.34543 16 9.30017 15.9891 9.25795 15.9679C9.21572 15.9467 9.17736 15.9157 9.14506 15.8765Z"
                            fill="#070505" />
                    </svg>
                </div>
                <div id={prevElId} className={`swiper-button-prev ${styles.forNav__prevBtn}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.85494 0.123483C6.88728 0.162586 6.91293 0.209021 6.93044 0.260134C6.94794 0.311248 6.95695 0.366037 6.95695 0.421368C6.95695 0.476699 6.94794 0.531488 6.93044 0.582601C6.91293 0.633714 6.88728 0.680149 6.85494 0.719252L1.18808 7.57901L15.6522 7.57901C15.7444 7.57901 15.8329 7.62337 15.8981 7.70233C15.9634 7.78129 16 7.88838 16 8.00005C16 8.11171 15.9634 8.21881 15.8981 8.29777C15.8329 8.37673 15.7444 8.42109 15.6522 8.42109L1.18808 8.42109L6.85494 15.2808C6.88726 15.32 6.91289 15.3664 6.93038 15.4175C6.94787 15.4686 6.95687 15.5234 6.95687 15.5787C6.95687 15.6341 6.94787 15.6888 6.93038 15.7399C6.91289 15.7911 6.88726 15.8375 6.85494 15.8766C6.82262 15.9157 6.78426 15.9468 6.74204 15.9679C6.69981 15.9891 6.65456 16 6.60886 16C6.56315 16 6.5179 15.9891 6.47568 15.9679C6.43345 15.9468 6.39509 15.9157 6.36277 15.8766L0.102011 8.29793C0.0696715 8.25883 0.0440168 8.21239 0.026513 8.16128C0.00900921 8.11017 -3.4727e-07 8.05538 -3.49689e-07 8.00005C-3.52108e-07 7.94472 0.0090092 7.88993 0.026513 7.83881C0.0440168 7.7877 0.0696715 7.74127 0.102011 7.70216L6.36277 0.123483C6.39508 0.0843368 6.43344 0.0532812 6.47566 0.0320928C6.51789 0.0109043 6.56315 -2.86884e-07 6.60886 -2.88882e-07C6.65456 -2.9088e-07 6.69983 0.0109043 6.74205 0.0320928C6.78428 0.0532812 6.82264 0.0843368 6.85494 0.123483Z"
                            fill="#070505" />
                    </svg>
                </div>
            </CustomSwiperFor>
            <CustomSwiperNav
                breakpoints={{
                    320: {
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
            >
                {data &&
                    data.map((item, index) => (
                        <SwiperSlide key={item.id} className={styles.navSlide}>
                            <Box className='img-wrapper'>
                                <Image src={item.src} alt={`Thumbnail image ${index + 1}`} width={116} height={116}
                                    className={styles.navSlide__img} />
                            </Box>
                        </SwiperSlide>
                    ))}
            </CustomSwiperNav>
        </Box>
    );
};

export default ProductSwiper;
