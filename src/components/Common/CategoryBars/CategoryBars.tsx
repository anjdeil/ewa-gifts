import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFetchAllCategoriesListQuery } from "@/store/wooCommerce/wooCommerceApi";
import CategoryBarsSkeleton from "./CategoryBarsSkeleton";
import styles from "./styles.module.scss";
import transformCategoryBars from "@/services/transformers/woocommerce/transformCategoryBars";

export const CategoryBars = () =>
{

    const { data = [], isLoading, isError, error } = useFetchAllCategoriesListQuery();

    if (isLoading)
    {
        return (<CategoryBarsSkeleton />)
    }

    const categories = data.length ? transformCategoryBars(data) : [];

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
                            src={imageSrc}
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