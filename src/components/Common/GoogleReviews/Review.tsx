import React from "react";
import styles from "./styles.module.scss";
import Stars from "./Stars";
import { ReviewType } from "@/types/GoogleReviews";
import Image from "next/image";
import Link from "next/link";

export default function Review({
    photo,
    name,
    rating,
    text,
    authorUrl
}: ReviewType) {
    return (
        <div className={styles["review"]}>
            <Link href={authorUrl} target="_blank" className={styles["review__author"]}>
                <Image className={styles["review__photo"]} width={64} height={64} alt={name} src={photo}></Image>
                <div className={styles["review__name"]}>{name}</div>
            </Link>
            <Stars rating={rating} />
            <p className={styles["review__text"]}>
                {text}
            </p>
        </div>
    )
} 