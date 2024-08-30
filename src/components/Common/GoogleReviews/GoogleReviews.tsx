import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import 'swiper/css/pagination';
import CustomSwiper from "@/components/Shop/TopSeller/StyledSwiper";
import styles from "./styles.module.scss";
import Review from "./Review";
import axios from "axios";
import transformGoogleReviews from "@/Utils/transformGoogleReviews";
import { GoogleReviewType } from "@/types/GoogleReviews";

interface GoogleReviewsData {
    reviews: GoogleReviewType[]
}

export default function GoogleReviews() {
    const [data, setData] = useState<GoogleReviewsData | null>(null);

    useEffect(() => {
        axios.get('/api/google-reviews')
            .then(response => {
                setData(response.data);
            })
    }, []);

    const reviews = data?.reviews ? transformGoogleReviews(data.reviews) : [];
    console.log(reviews);

    return (
        <>
            <h2 className={`secondary-title ${styles["google-reviews__title"]}`}>Opinie klientów</h2>
            <div className={styles["google-reviews__carousel"]}>
                <CustomSwiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={20}
                    breakpoints={{
                        600: {
                            slidesPerView: 2,
                        },
                        980: {
                            slidesPerView: 3,
                        },
                    }}
                    grid={{
                        rows: 1,
                    }}
                >
                    {reviews.map(({ photo, name, authorUrl, rating, text }) =>
                        <SwiperSlide>
                            <Review
                                key={name}
                                authorUrl={authorUrl}
                                photo={photo}
                                name={name}
                                rating={rating}
                                text={text}
                            />
                        </SwiperSlide>
                    )}
                </CustomSwiper>
            </div>
        </>
    );
}