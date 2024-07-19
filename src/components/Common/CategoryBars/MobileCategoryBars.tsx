import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";

interface MobileCategoryBarsProps {
    categories: CategoryType[]
}

const MobileCategoryBars: FC<MobileCategoryBarsProps> = ({ categories }) => {

    return (
        <>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                className="mobile-category-bars"
            >
                {categories?.map(({ id, name, slug }) => (
                    <SwiperSlide key={id} className={styles["mobile-category-bars__slide"]}>
                        <Link
                            href={`/product-category/${slug}`}
                            className={styles["mobile-category-bars__link"]}
                        >
                            <div className={styles["mobile-category-bars__image-wrap"]}>
                                <Image
                                    className={styles["mobile-category-bars__image"]}
                                    src={`/images/categories/${slug}.svg`}
                                    width={60}
                                    height={60}
                                    alt={name}
                                />
                            </div>
                            <div className={styles["mobile-category-bars__name"]}>{name}</div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default MobileCategoryBars;