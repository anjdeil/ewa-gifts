import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { useMediaQuery } from "@mui/material";
import MobileCategoryBars from "./MobileCategoryBars";
import { CategoryType } from "@/types/Services/customApi/Category/CategoryType";
import { AppContext } from "@/components/Layout/Layout";

export const CategoryBars = () =>
{
    const isMobile = useMediaQuery('(max-width: 1200px)');

    const context = useContext(AppContext);
    const categoriesData: CategoryType[] | undefined = context?.categories ? context.categories : [];

    const categories: CategoryType[] = categoriesData.length ?
        categoriesData.filter((item: CategoryType) =>
        {
            if (item.parent_id) return false;
            else if (item.slug === "uncategorized") return false;
            else return true;
        }) : [];


    if (isMobile)
    {
        return (<MobileCategoryBars categories={categories} />);
    } else
    {
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
                                unoptimized={true}
                            />
                            <div className={styles["categories-list__name"]}>{name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }

}