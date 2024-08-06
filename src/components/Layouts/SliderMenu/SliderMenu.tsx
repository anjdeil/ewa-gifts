import React, { FC, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { wpMenuProps } from '@/types';
import styles from './styles.module.scss';
import { MenuSkeleton } from "../MenuSkeleton";
import { MenuItemsType } from '@/types/Services/customApi/Menu/MenuItemsType';
import { MenusContext } from '@/pages/_app';
import Link from 'next/link';

export const SliderMenu: FC<wpMenuProps> = ({ menuId, className, skeleton }) => {
    const menus: MenuItemsType[] | undefined = useContext(MenusContext);
    const menuItems = menus?.find(({ id }) => id === menuId)?.items;

    const swiperId = `SliderMenu`;
    const nextElId = `btn-next`;
    const prevElId = `btn-prev`;

    if (!menuItems && skeleton) {
        return (
            <MenuSkeleton
                elements={skeleton.elements}
                isColumn={skeleton.isColumn}
                width={skeleton.width}
                height={skeleton.height}
                gap={skeleton.gap}
            />
        )
    }

    return (
        <div>
            <div id={prevElId} className={`swiper-button-prev ${styles.sliderMenu__navBtn}`}>
                <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.5002 6.5C11.698 6.49996 11.8913 6.45107 12.0557 6.3595C12.2201 6.26793 12.3482 6.13779 12.4239 5.98555C12.4996 5.8333 12.5194 5.66577 12.4808 5.50414C12.4422 5.34251 12.347 5.19404 12.2072 5.0775L7.20721 0.910834C7.01968 0.754608 6.76538 0.666845 6.50021 0.666845C6.23505 0.666845 5.98074 0.754608 5.79321 0.910834L0.793212 5.0775C0.653402 5.19404 0.558197 5.34251 0.519629 5.50414C0.481062 5.66577 0.500865 5.8333 0.576535 5.98555C0.652205 6.1378 0.780345 6.26793 0.944755 6.3595C1.10916 6.45107 1.30246 6.49997 1.50021 6.5L11.5002 6.5Z" fill="#696969" />
                </svg>
            </div>
            <Swiper
                id={swiperId}
                navigation={{
                    nextEl: `#${nextElId}`,
                    prevEl: `#${prevElId}`,
                }}
                modules={[Navigation]}
                direction="vertical"
                slidesPerView={6}
                spaceBetween={30}
                className={`${styles.sliderMenu} ${className ? className : ''}`}
            >
                {menuItems && menuItems.map(({ title, url }) => (
                    <SwiperSlide
                        className={`${styles.sliderMenu__slide}`}
                        key={url}>
                        <Link
                            href={url}
                            className={styles.sliderMenu__slideLink}
                        >
                            {title}
                        </Link>
                    </SwiperSlide>
                ))}
                <SwiperSlide
                    className={`${styles.sliderMenu__slide} desc`}
                >
                    &nbsp;
                </SwiperSlide>
            </Swiper>
            <div id={nextElId} className={`swiper-button-next ${styles.sliderMenu__navBtn}`}>
                <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.49979 0.5C1.30204 0.500035 1.10874 0.548928 0.944329 0.640498C0.779919 0.732069 0.651779 0.862205 0.576109 1.01445C0.500439 1.1667 0.480636 1.33423 0.519203 1.49586C0.557771 1.65749 0.652978 1.80596 0.792787 1.9225L5.79279 6.08917C5.98031 6.24539 6.23462 6.33316 6.49979 6.33316C6.76495 6.33316 7.01926 6.24539 7.20679 6.08917L12.2068 1.9225C12.3466 1.80596 12.4418 1.65749 12.4804 1.49586C12.5189 1.33423 12.4991 1.1667 12.4235 1.01445C12.3478 0.862205 12.2197 0.732069 12.0552 0.640498C11.8908 0.548928 11.6975 0.500035 11.4998 0.5L1.49979 0.5Z" fill="#696969" />
                </svg>
            </div>
        </div >

    );
}
