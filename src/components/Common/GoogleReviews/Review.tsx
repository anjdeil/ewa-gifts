import { ReviewType } from "@/types/GoogleReviews";
import { Collapse } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Stars from "./Stars";
import styles from "./styles.module.scss";

export default function Review({
    photo,
    name,
    rating,
    text,
    authorUrl,
    open,
    setOpen
}: ReviewType)
{
    const reviewRef = useRef<HTMLDivElement | null>(null);

    useEffect(() =>
    {
        const currentRef = reviewRef.current;
        const observer = new IntersectionObserver(
            ([entry]) =>
            {
                if (!entry.isIntersecting && open === name)
                {
                    setOpen("");
                }
            }
        );

        if (currentRef) observer.observe(currentRef);

        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [open, name, setOpen]);

    return (
        <div ref={reviewRef} className={styles["review"]}>
            <Link href={authorUrl} target="_blank" className={styles["review__author"]}>
                <Image className={styles["review__photo"]} width={64} height={64} alt={name} src={photo} />
                <div className={styles["review__name"]}>{name}</div>
            </Link>
            <Stars rating={rating} />
            <Collapse collapsedSize="5.2rem" in={open === name} timeout="auto">
                <p className={styles["review__text"]}>
                    {text}
                </p>
            </Collapse>
            {open !== name && <button className={`${styles["review__button"]} more-link`} onClick={() => setOpen(name)}>więcej</button>}
        </div>
    )
} 