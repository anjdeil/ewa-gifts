// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useSelector } from "react-redux";
import { SwiperPopupProps } from '@/types';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const CustomSwiper = styled(Swiper)`
	.swiper-button-prev.swiper-button-disabled,
	.swiper-button-next.swiper-button-disabled {
		opacity: 1;
	}

	.swiper-button-prev {
		left: 0;
		z-index: 100;
	}

	.swiper-button-next {
		right: 0;
		z-index: 100;
	}

	.swiper-button-prev:after,
	.swiper-button-next:after {
		font-size: 0;
	}

	.swiper-button-disabled svg path {
		fill: #FECB00;
	}
`;

const SwiperPopup: React.FC<SwiperPopupProps> = ({ onClose }) => {
    const swiperId = `swiper-3`;
    const nextElId = `${swiperId}-next`;
    const prevElId = `${swiperId}-prev`;

    const handlerClickBg = ({ target }) => {
        if (target.classList.contains(styles.swiper__popup)) {
            onClose();
        }
    }
    const handlerClick = () => {
        onClose();
    }

    const data = useSelector(
        useMemo(() => (state) => state.swiperModal.data, [])
    );

    const currentSlide = useSelector(
        useMemo(() => (state) => state.swiperModal.currentSlide, [])
    );

    return (
        <div className={styles.swiper__popup} onClick={handlerClickBg}>
            <div className={styles.swiper__body}>
                <IconButton className={styles.swiper__close} onClick={handlerClick}>
                    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="0.607143" strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                </IconButton>
                <div>
                    <CustomSwiper
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
                        modules={[FreeMode, Navigation]}
                        className={`mySwiper3 ${styles.forNav}`}
                        initialSlide={currentSlide}
                    >
                        {data &&
                            data.map((item: { id: React.Key | null | undefined; src: string | StaticImport; }, index: number) => (
                                <SwiperSlide key={item.id} className={styles.slide}>
                                    <Image src={item.src} alt={`Product image ${index + 1}`} width={600} height={590}
                                        className={styles.slide__img} />
                                </SwiperSlide>
                            ))}
                        <div id={nextElId} className={`swiper-button-next ${styles.forNav__nextBtn}`}>
                            <svg width="32" height="28" viewBox="0 0 32 28" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.1736 26.5765C16.9988 26.4023 16.8601 26.1953 16.7655 25.9674C16.6709 25.7395 16.6221 25.4951 16.6221 25.2484C16.6221 25.0016 16.6709 24.7572 16.7655 24.5293C16.8601 24.3014 16.9988 24.0944 17.1736 23.9202L25.2189 15.8749L2.25018 15.8749C1.7529 15.8749 1.27599 15.6774 0.924358 15.3258C0.572727 14.9741 0.375183 14.4972 0.375183 13.9999C0.375183 13.5026 0.572727 13.0257 0.924358 12.6741C1.27599 12.3225 1.7529 12.1249 2.25018 12.1249L25.2189 12.1249L17.1736 4.07649C16.8214 3.72425 16.6235 3.24651 16.6235 2.74837C16.6235 2.25023 16.8214 1.77248 17.1736 1.42024C17.5259 1.068 18.0036 0.870117 18.5017 0.870117C18.9999 0.870117 19.4776 1.068 19.8299 1.42024L31.0799 12.6702C31.2547 12.8444 31.3934 13.0514 31.488 13.2793C31.5826 13.5072 31.6313 13.7516 31.6313 13.9984C31.6313 14.2451 31.5826 14.4895 31.488 14.7174C31.3934 14.9453 31.2547 15.1523 31.0799 15.3265L19.8299 26.5765C19.6557 26.7513 19.4487 26.89 19.2208 26.9846C18.9929 27.0793 18.7485 27.128 18.5017 27.128C18.255 27.128 18.0106 27.0793 17.7827 26.9846C17.5548 26.89 17.3478 26.7513 17.1736 26.5765Z"
                                    fill="black" />
                            </svg>
                        </div>
                        <div id={prevElId} className={`swiper-button-prev ${styles.forNav__prevBtn}`}>
                            <svg width="32" height="28" viewBox="0 0 32 28" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.8327 1.42155C15.0075 1.59575 15.1462 1.80273 15.2409 2.03064C15.3355 2.25855 15.3842 2.5029 15.3842 2.74968C15.3842 2.99645 15.3355 3.2408 15.2409 3.46871C15.1462 3.69662 15.0075 3.90361 14.8327 4.0778L6.78742 12.1231L29.7562 12.1231C30.2534 12.1231 30.7304 12.3207 31.082 12.6723C31.4336 13.0239 31.6312 13.5008 31.6312 13.9981C31.6312 14.4954 31.4336 14.9723 31.082 15.3239C30.7304 15.6756 30.2534 15.8731 29.7562 15.8731L6.78742 15.8731L14.8327 23.9216C15.185 24.2738 15.3829 24.7515 15.3829 25.2497C15.3829 25.7478 15.185 26.2256 14.8327 26.5778C14.4805 26.93 14.0027 27.1279 13.5046 27.1279C13.0065 27.1279 12.5287 26.93 12.1765 26.5778L0.926478 15.3278C0.751678 15.1536 0.612984 14.9466 0.518349 14.7187C0.423714 14.4908 0.374999 14.2465 0.374999 13.9997C0.374999 13.7529 0.423714 13.5086 0.518349 13.2806C0.612984 13.0527 0.751678 12.8457 0.926478 12.6716L12.1765 1.42155C12.3507 1.24675 12.5577 1.10806 12.7856 1.01342C13.0135 0.918787 13.2578 0.870071 13.5046 0.870071C13.7514 0.870071 13.9957 0.918787 14.2236 1.01342C14.4515 1.10806 14.6585 1.24675 14.8327 1.42155Z"
                                    fill="black" />
                            </svg>
                        </div>
                    </CustomSwiper>
                </div>
            </div>
        </div>
    )
}
export default SwiperPopup;