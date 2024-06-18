import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFetchCategoryListQuery } from "@/store/custom/customApi";
import CategoryBarsSkeleton from "./CategoryBarsSkeleton";
import styles from "./styles.module.scss";
import transformCategoryBars from "@/services/transformers/woocommerce/transformCategoryBars";
import { useMediaQuery } from "@mui/material";
import MobileCategoryBars from "./MobileCategoryBars";

export const CategoryBars = () => {
    const isMobile = useMediaQuery('(max-width: 1200px)');

    const { data = [], isLoading, isError, error } = useFetchCategoryListQuery({});

    if (isLoading) {
        return (<CategoryBarsSkeleton />)
    }

    // console.log("Categories", data);
    const categories = data.data.items.length ? transformCategoryBars(data.data.items) : [];


    if (isMobile) {
        return (<MobileCategoryBars categories={categories} />);
    } else {
        return (
            <ul className={styles["categories-list"]}>
                {categories?.map(({ id, categoryName, imageSrc, slug }) => (
                    <li key={id} className={styles["categories-list__item"]}>
                        <Link
                            href={`/product-category/${slug}`}
                            className={styles["categories-list__link"]}
                        >
                            <Image
                                className={styles["categories-list__image"]}
                                src={`/images/categories/${slug}.svg`}
                                width={60}
                                height={60}
                                alt={categoryName}
                            />
                            <div className={styles["categories-list__name"]}>{categoryName}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }

}