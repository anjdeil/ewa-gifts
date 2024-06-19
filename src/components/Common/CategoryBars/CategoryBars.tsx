import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFetchCategoryListQuery } from "@/store/custom/customApi";
import CategoryBarsSkeleton from "./CategoryBarsSkeleton";
import styles from "./styles.module.scss";
import { useMediaQuery } from "@mui/material";
import MobileCategoryBars from "./MobileCategoryBars";
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";
import MobileCategoryBarsSkeleton from "./MobileCategoryBarsSkeleton";

export const CategoryBars = () => {
    const isMobile = useMediaQuery('(max-width: 1200px)');

    const { data = [], isLoading } = useFetchCategoryListQuery({});

    if (isLoading) {
        if (isMobile) {
            return (<MobileCategoryBarsSkeleton />)
        } else {
            return (<CategoryBarsSkeleton />)
        }
    }

    const categories: CategoryType[] = data.data.items.length ?
        data.data.items.filter((item: CategoryType) => {
            if (item.parent_id) return false;
            else if (item.slug === "uncategorized") return false;
            else return true;
        }) : [];


    if (isMobile) {
        return (<MobileCategoryBars categories={categories} />);
    } else {
        return (
            <ul className={styles["categories-list"]}>
                {categories?.map(({ id, name, slug }) => (
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
                                alt={name}
                            />
                            <div className={styles["categories-list__name"]}>{name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }

}